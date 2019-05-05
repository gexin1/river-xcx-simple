const config = wx.$config;
const app = getApp();
/**
 * 储存值
 * @param {String} key
 * @param {*} data
 * @param {String} mode
 */
const setValue = (key, data, mode) => {
    if (config.storeMode == 'STORAGE' && mode === 'INIT') {
        return;
    }
    if (mode === 'STORAGE' || config.storeMode == 'STORAGE') {
        wx.setStorageSync(key, data);
    } else {
        app.globalData[key] = data;
    }
};
/**
 *  获取储存的值
 * @param {String} key
 * @param {String} mode
 */
const getValue = (key, mode) => {
    if (mode === 'STORAGE' || config.storeMode == 'STORAGE') {
        return wx.getStorageSync(key);
    } else {
        return app.globalData[key];
    }
};
/**
 *
 * @param {*} key
 * @param {*} mode
 */
const delValue = (key, mode) => {
    if (mode === 'STORAGE' || config.storeMode == 'STORAGE') {
        wx.removeStorageSync(key);
    } else {
        app.globalData[key] = null;
    }
};

export { setValue, delValue, getValue };
