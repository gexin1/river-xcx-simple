import { setValue, delValue, getValue } from '../index';
import { isEmpty } from '../../utils/util';
const ADD_TASK_DES = `ADD_TASK_DES`;
const DEL_TASK_DES = `DEL_TASK_DES`;
const UPDATE_TASK_DES = `UPDATE_TASK_DES`;
const SELECT_TASK_DES = `SELECT_TASK_DES`;

const HAS_TASK_DES = `HAS_TASK_DES`;

const TASK_DES = `TASK_DES`;

//初始化数据
const taskDesInitData = {};

/**
 * 数据处理
 * @param {*} type
 * @param {*} payload
 */

const taskDesHandle = (type, payload) => {
    switch (type) {
        case ADD_TASK_DES:
            setValue(TASK_DES, payload);
            break;
        case DEL_TASK_DES:
            delValue(TASK_DES);
            break;
        case SELECT_TASK_DES:
            return getValue(TASK_DES) || taskDesInitData;
        case HAS_TASK_DES:
            return isEmpty(getValue(TASK_DES));
        default:
            break;
    }
};

const addTaskDes = (payload = {}) => {
    taskDesHandle(ADD_TASK_DES, payload);
};
const delTaskDes = () => {
    taskDesHandle(DEL_TASK_DES);
};
const getTaskDes = () => {
    return taskDesHandle(SELECT_TASK_DES);
};
const hasTaskDes = () => {
    return !taskDesHandle(HAS_TASK_DES);
};

export { addTaskDes, delTaskDes, hasTaskDes, getTaskDes };
