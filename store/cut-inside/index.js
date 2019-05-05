import { setValue, delValue, getValue } from '../index';
const ADD_CUT_IMAGE = `ADD_CUT_IMAGE`;
const DEL_CUT_IMAGE = `DEL_CUT_IMAGE`;
const UPDATE_CUT_IMAGE = `UPDATE_CUT_IMAGE`;
const SELECT_CUT_IMAGE = `SELECT_CUT_IMAGE`;

const CUT_IMAGE = `CUT_IMAGE`;

//初始化数据
const cutImgInitData = '';

/**
 * 数据处理
 * @param {*} type
 * @param {*} payload
 */

const cutHandle = (type, payload) => {
    switch (type) {
        case ADD_CUT_IMAGE:
            setValue(CUT_IMAGE, payload);
            break;
        case DEL_CUT_IMAGE:
            delValue(CUT_IMAGE);
            break;
        case SELECT_CUT_IMAGE:
            return getValue(CUT_IMAGE) || cutImgInitData;
        default:
            break;
    }
};

const addCutImg = (payload = '') => {
    cutHandle(ADD_CUT_IMAGE, payload);
};
const delCutImg = () => {
    cutHandle(DEL_CUT_IMAGE);
};
const getCutImg = () => {
    return cutHandle(SELECT_CUT_IMAGE);
};

export { addCutImg, delCutImg, getCutImg };
