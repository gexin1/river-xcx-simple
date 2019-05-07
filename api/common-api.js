import { ajax, upload, getErrorMsg } from '../utils/util';
import { pify, pifyShowToastErr } from '../utils/promisify';
import config from '../config/index';

import { addLogin, delLogin, getLogin, isLogin } from '../store/login/index';

const url = {
    common: {
        login: `${config.commonHost}/xcx/login`,
        pay: `${config.commonHost}/xcxpay/pay`,
        saveadvid: `${config.commonHost}/xcx/saveadvid`,
        upload: `${config.commonHost}/upload/upload`
    }
};

/**
 * Login  微信登录
 * <button open-type='getUserInfo' bindgetuserinfo="getUserInfo">
 * getUserInfo 函数得到e.detail
 * data e.detail 传入  就是授权登录，不传就是静默登录
 */
const login = function(data = null) {
    if (data) {
        delLogin();
    }

    if (isLogin()) {
        const res = getLogin();
        let { Token, Expire, UserID, IsNewUser } = res;
        if (Token && Expire && new Date().getTime() < Expire * 1000) {
            //未过期
            return Promise.resolve({
                Token,
                UserID,
                IsNewUser
            });
        }
        //已过期 重新进行登录
        else {
            return wxLogin(data);
        }
    } else {
        return wxLogin(data);
    }
};

/**
 *  登录
 */
const wxLogin = function(data = null) {
    return pify(wx.login)()
        .then(res => {
            const params = {
                code: res.code
            };
            if (data && typeof data === 'object') {
                let {
                    userInfo: { nickName = '', avatarUrl = '' },
                    encryptedData = '',
                    iv = ''
                } = data;
                
                Object.assign(params, { nickName, avatarUrl, encryptedData, iv });
            }
            return ajax({
                url: url.common.login,
                method: 'POST',
                data: params,
                toast: false
            });
        })
        .then(res => {
            if (res.f === 1) {
                let {
                    d,
                    d: { Token, UserID, IsNewUser }
                } = res;
                addLogin(d);
                return Promise.resolve({
                    Token,
                    UserID,
                    IsNewUser
                });
            } else {
                throw res;
            }
        })
        .catch(err => {
            pifyShowToastErr(getErrorMsg(err));
            return Promise.reject(err);
        });
};
/**
 * 上传 formId
 * @param {* formId} formId
 * @param {* 1: 普通, 2: 支付} type
 */
const submitFormId = function(formId, type = 1) {
    return login().then(res => {
        return ajax({
            url: '/xcx/saveformid',
            Token: res.Token,
            data: {
                formid: formId,
                type: type
            }
        });
    });
};
/**
 * 微信支付(需登录)
 * @param {* 支付金额} fee
 * @param {* 支付来源 对应某条数据 id，如灯 id} from 非必填
 */
const pay = function(fee, from = '') {
    return login()
        .then(res => {
            return ajax({
                url: url.common.pay,
                Token: res.Token,
                data: {
                    name: '打赏',
                    fee: fee,
                    from: from
                }
            });
        })
        .then(res => {
            let prepay_id = res.package.split('prepay_id=');
            if (prepay_id.length >= 2) {
                prepay_id = prepay_id[1];
                submitFormId(prepay_id, 2);
            }
            return pify(wx.requestPayment)({
                timeStamp: res.timeStamp,
                nonceStr: res.nonceStr,
                package: res.package,
                signType: res.signType,
                paySign: res.paySign
            }).catch(err => {
                console.log(err);
            });
        });
};

/**
 * 上传接口
 * @param {String} filePath 微信的临时路径
 * @returns {Promise}
 */
const uploadFile = filePath => {
    return upload({
        url: url.common.upload,
        filePath,
        name: 'file'
    });
};
/**
 * 获取用户的登陆信息
 */
const getUserInfo = () => {
    return login();
};

export { login, submitFormId, pay, uploadFile, getUserInfo };
