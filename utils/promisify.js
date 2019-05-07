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
/**
 * 默认title icon为none
 * @param {String} title
 */
const pifyShowToastErr = title => pify(wx.showToast, { icon: 'none' })({ title });

const pifySetClipboardData = pify(wx.setClipboardData);
/**
 * 封装导航
 * @param {Object} url 跳转的路径  query参数
 * @example
 * wx.pifyNavigateTo({
 *  url:'/pages/detail/detail',
 *  query:{
 *  a:1
 *  }
 * })
 */
const pifyNavigateTo = ({ url = '', query = {} }) => {
    url += queryToString(query);
    return pify(wx.navigateTo)({
        url: url
    });
};
/**
 * 跳转tab
 * @param {Object} url 跳转的路径
 */
const pifySwitchTab = ({ url }) => {
    return pify(wx.switchTab)({
        url: url
    });
};
/**
 * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
 * @param {*} url 跳转的路径  query参数
 */
const pifyRedirectTo = ({ url = '', query = {} }) => {
    url += queryToString(query);
    return pify(wx.redirectTo)({
        url: url
    });
};
/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {Object} url 跳转的路径  query参数
 */
const pifyReLaunch = ({ url = '', query = {} }) => {
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
    pifyRedirectTo,
    pifyReLaunch
};
