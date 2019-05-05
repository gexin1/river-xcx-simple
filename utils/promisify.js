import { queryToString } from './util';

/**
 * 将小程序暴露的接口Promise化
 * @param api
 * @param options
 * @param params
 * @example
 * pify(wx.request)({ url: 'https://baidu.com' })
 * 		.then(res => {
 * 			 console.log('接收到响应: ', res);
 * 		})
 * 	  .catch(err => {
 * 	  	console.error(err);
 * 	  })
 */
const pify = (api, options) => params =>
    new Promise((resolve, reject) => {
        // 不支持的api，默认弹modal提示版本低，然后会reject 一个undefined
        if (!api) {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试',
                complete: () => reject(),
                confirmColor: '#006eff',
                showCancel: false
            });
        } else {
            api.call(wx, { ...options, ...params, success: resolve, fail: reject });
        }
    });

const pifyChooseImage = pify(wx.chooseImage);

const pifyGetUserInfo = pify(wx.getUserInfo);

const pifyRequest = pify(wx.request);

const pifyUploadFile = pify(wx.uploadFile);

const pifyGetStorage = pify(wx.getStorage);

const pifyShowModel = pify(wx.showModal);

const pifyAuthorize = pify(wx.authorize);

const pifyOpenSetting = pify(wx.openSetting);

const pifyShowToastErr = title => pify(wx.showToast, { icon: 'none' })({ title });

const pifySetClipboardData = pify(wx.setClipboardData);

const pifyNavigateTo = ({ url = '', query = {} }) => {
    url += queryToString(query);
    return pify(wx.navigateTo)({
        url: url
    });
};

const pifySwitchTab = ({ url }) => {
    return pify(wx.switchTab)({
        url: url
    });
};

const pifyRedirectTo = ({ url='',query={} }) => {
    url += queryToString(query);
    return pify(wx.redirectTo)({
        url: url
    });
};
export {
    pifyGetUserInfo,
    pify,
    pifyRequest,
    pifyGetStorage,
    pifyShowToastErr,
    pifyShowModel,
    pifyAuthorize,
    pifyOpenSetting,
    pifyChooseImage,
    pifyUploadFile,
    pifySetClipboardData,
    pifyNavigateTo,
    pifySwitchTab,
    pifyRedirectTo
};
