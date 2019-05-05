import { ajax, upload } from '../utils/util';
import { pify } from '../utils/promisify';
import config from '../config/index';

const url = {
    common: {
        allConfig: `${config.commonHost}/xcx/get-app-config`,
        saveadvid: `${config.commonHost}/xcx/saveadvid`,
        uploadFile: `${config.commonHost}/gateway/api/system/upload`
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
        wx.removeStorageSync('userClient');
    }
    return pify(wx.getStorage)({
        key: 'userClient'
    })
        .then(res => {
            let { Cookie:Token, UserInfo } = res.data;
            if (Token) {
                //未过期
                return {
                    Token,
                    UserInfo
                };
            }
            //已过期 重新进行登录
            else {
                return wxLogin(data);
            }
        })
        .catch(err => {
            return wxLogin(data);
        });
};

/**
 *  登录
 */
const wxLogin = function(data = null) {
    return pify(wx.login)()
        .then(res => {
            if (res.errMsg === 'login:ok') {
                const params = {
                    Code: res.code
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
                    url: '/gateway/api/login/wx-open',
                    method: 'POST',
                    data: params
                });
            }
        })
        .then(res => {
            if (res.flag === 1) {
                //设置本地storage
                let {
                    data,
                    data: { Cookie, UserInfo }
                } = res;

                wx.setStorageSync('userClient', data);
                return {
                    Token: Cookie,
                    UserInfo
                };
            } else {
                throw res;
            }
        })
        .catch(err => {
            console.log(err);
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
                url: '/xcxpay/pay',
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
 * 更新 头像 昵称 等信息
 */
const updateUserInfo = function(user, issend = '1') {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: '/xcx/update-user',
            Token,
            method: 'POST',
            data: {
                nickName: user.nickName,
                gender: user.gender,
                avatarUrl: user.avatarUrl,
                city: user.city,
                province: user.province,
                country: user.country,
                IsAcceptPush: issend
            }
        });
    });
};

const uploadFile = filePath => {
    return upload({
        url: url.common.uploadFile,
        filePath,
        name: 'file'
    });
};

const getUserInfo = () => {
    return login();
};

export { login, submitFormId, pay, updateUserInfo, uploadFile, getUserInfo };
