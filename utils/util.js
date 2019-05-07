import config from '../config/index';

import { pifyRequest, pifyShowToastErr, pifyUploadFile } from './promisify';

/**
 * 获取错误信息
 * @param {Object|String} err
 * @param defaultMsg
 * @return {*}
 */
const getErrorMsg = (err, defaultMsg = '') => {
    if (!err) return;
    let errorMsg = '';
    if (typeof err === 'string') return err;
    if (err && typeof err.errMsg === 'string' && /cancel/.test(err.errMsg)) {
        return '';
    }
    if (typeof err === 'object' && 'code' in err) {
        if (err.msg) {
            errorMsg = `${err.msg}`;
        } else {
            errorMsg = '网络繁忙';
        }
        if (!codeReg.test(errorMsg)) {
            errorMsg += `(${err.code})`;
        }
    } else {
        errorMsg = defaultMsg || '连接服务器失败，请稍后再试';
    }
    return errorMsg;
};
/**
 *
 * @param {*} param0
 */
const upload = function({ url, filePath, name = 'file', header = {}, formData = {}, loading = false, Token = '' }) {
    if (loading) {
        wx.showLoading({
            title: '加载中...'
        });
    }
    header['cookie'] = `AppId=${config.appid};Via=MINI;Platform=MINI;Token=${Token}`;

    formData.Platform = config.Platform;
    formData.Via = config.Via;
    formData.AppId = config.appid;

    return new Promise((resolve, reject) => {
        pifyUploadFile({
            url,
            filePath,
            name,
            header,
            formData
        })
            .then(res => {
                if (res.statusCode == 200) {
                    let _data = JSON.parse(res.data);
                    if (_data.flag !== 1) {
                        throw _data.msg;
                    }
                    resolve(_data);
                }
            })
            .catch(err => {
                pifyShowToastErr(getErrorMsg(err));
                reject(err);
            })
            .finally(() => {
                if (loading) {
                    wx.hideLoading();
                }
            });
    });
};

/**
 * @param obj {}
 * @returns {Promise}
 * @description 接口请求
 */

const ajax = function(obj = {}) {
    if (obj.data == undefined) {
        obj.data = {};
    }
    let options = {
        url: '',
        header: {},
        method: 'GET',
        Token: '',
        loading: false,
        toast: true,
        data: {}
    };

    Object.assign(options, obj);

    options.data.Platform = config.Platform;
    options.data.Via = config.Via;
    options.data.AppId = config.appid;

    if (options.loading) {
        wx.showLoading({
            title: '加载中...'
        });
    }

    options.url = (options.url.indexOf('http') > -1 ? '' : config.commonHost) + options.url;
    options.method = options.method.toUpperCase();
    options.method === 'POST' ? (options.header['Content-Type'] = 'application/x-www-form-urlencoded') : '';
    options.header['cookie'] = options.Token;
    let errToast = true;
    return new Promise((resolve, reject) => {
        pifyRequest(options)
            .then(res => {
                if (options.loading) {
                    wx.hideLoading();
                }
                try {
                    let _data = res.data;
                    if (_data.flag === 1) {
                        return resolve(_data);
                    } else if (_data.flag == -100) {
                        //重新登录
                        wx.removeStorageSync('userClient');
                        //暂时这样写
                        wx.switchTab({
                            url: '/pages/index/index'
                        });
                        throw _data.msg;
                    } else if (_data.data.type === 'usertask') {
                        errToast = false;
                        throw _data.data;
                    } else if (_data.data.type === 'info') {
                        errToast = false;
                        wx.pifyShowModel({
                            title: '提示',
                            content: _data.data.msg
                        }).then(res => {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/perfect-info/perfect-info?type=other'
                                });
                            }
                        });
                        throw _data.data.msg;
                    } else if (_data.data.type === 'task') {
                        throw _data.data.msg;
                    } else {
                        throw _data.msg;
                    }
                } catch (err) {
                    throw err;
                }
            })
            .catch(err => {
                if (options.loading) {
                    wx.hideLoading();
                }
                errToast && options.toast && pifyShowToastErr(getErrorMsg(err));
                return reject(err);
            })
            .finally(() => {});
    });
};

/**
 * 请求用户授权
 * @param {*options} checkAuth 授予权限 {scope:'scope.userLocation'}
 * @description
 * 微信授权必须是同步模式 打开openSetting promise不能使用 改为callback
 */
const authorityControl = (options = {}, callback = () => {}) => {
    const scopeList = {
        'scope.userLocation': '地理位置',
        'scope.address': '通讯地址',
        'scope.invoiceTitle': '发票抬头',
        'scope.werun': '微信运动步数',
        'scope.record': '录音功能',
        'scope.writePhotosAlbum': '保存到相册',
        'scope.camera': '摄像头'
    };

    let convertScope = '';
    try {
        let { scope } = options;
        let convertScope = scopeList[scope];
        wx.getSetting({
            success(res) {
                if (res.authSetting[scope] == undefined) {
                    return wx.authorize({
                        ...options,
                        success: res => {
                            callback();
                        },
                        fail: err => {
                            pifyShowToastErr(`打开${convertScope}权限失败`);
                        }
                    });
                } else if (!res.authSetting[scope]) {
                    return wx.showModal({
                        title: '提示',
                        content: `没有${convertScope}权限,将不能使用小程序的部分功能`,
                        confirmText: '前往设置',
                        cancelText: '下次再说',
                        success(res) {
                            res.confirm &&
                                wx.openSetting({
                                    success: res => {
                                        if (res.authSetting[scope]) {
                                            callback();
                                        } else {
                                            throw 'err';
                                        }
                                    },
                                    fail: err => {
                                        throw 'err';
                                    }
                                });
                        },
                        fail: () => {
                            throw 'err';
                        }
                    });
                } else {
                    callback();
                }
            },
            fail: () => {
                throw 'err';
            }
        });
    } catch (err) {
        pifyShowToastErr(`打开${convertScope}权限失败`);
    }
};

/**
 * 检查一个值是否为空
 */
function isEmpty(value) {
    if (Array.isArray(value)) {
        return value.length === 0;
    } else if (typeof value === 'object') {
        if (value) {
            for (const _ in value) {
                return false;
            }
        }
        return true;
    } else {
        return !value;
    }
}
/**
 * 把Object对象拼接为字符串
 * @param {Object} data
 */
function queryToString(data = {}) {
    let str = ``;
    for (let key in data) {
        str += `${key}=${data[key]}&`;
    }
    str = str.substring(0, str.length - 1);
    return str ? `?${str}` : '';
}

export { config, authorityControl, ajax, upload, isEmpty, queryToString };
