import { setValue, delValue, getValue } from '../index';
import { isEmpty } from '../../utils/util';

const LOGIN = `userClient`;
const ADD_LOGIN = 'ADD_LOGIN';
const SELETE_LOGIN = 'SELETE_LOGIN';
const DEL_LOGIN = 'DEL_LOGIN';

//初始化数据
const loginInit = {};

/**
 * 数据处理
 * @param {*} type
 * @param {*} payload
 */

const loginHandle = (type, payload) => {
    switch (type) {
        case ADD_LOGIN:
            setValue(LOGIN, payload,'STORAGE');
            break;
        case DEL_LOGIN:
            delValue(LOGIN,'STORAGE');
            break;
        case SELETE_LOGIN:
            return getValue(LOGIN,'STORAGE') || loginInit;
        default:
            break;
    }
};

const addLogin = (payload = {}) => {
    loginHandle(ADD_LOGIN, payload);
};

const delLogin = () => {
    loginHandle(DEL_LOGIN);
};

const getLogin = () => {
    return loginHandle(SELETE_LOGIN);
};
const isLogin = () => {
    return !isEmpty(loginHandle(SELETE_LOGIN));
};

export { addLogin, delLogin, getLogin, isLogin };
