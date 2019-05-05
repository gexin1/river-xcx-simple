import { setValue, delValue, getValue } from '../index';
import { isEmpty } from '../../utils/util';
const ADD_TASK_EDIT = `ADD_TASK_EDIT`;
const DEL_TASK_EDIT = `DEL_TASK_EDIT`;
const UPDATE_TASK_EDIT = `UPDATE_TASK_EDIT`;
const SELECT_TASK_EDIT = `SELECT_TASK_EDIT`;

const HAS_TASK_EDIT = `HAS_TASK_EDIT`;

const TASK_EDIT = `TASK_EDIT`;

//初始化数据
const taskEDITInitData = {};

/**
 * 数据处理
 * @param {*} type
 * @param {*} payload
 */

const taskEditHandle = (type, payload) => {
    switch (type) {
        case ADD_TASK_EDIT:
            setValue(TASK_EDIT, payload);
            break;
        case DEL_TASK_EDIT:
            delValue(TASK_EDIT);
            break;
        case SELECT_TASK_EDIT:
            return getValue(TASK_EDIT) || taskEDITInitData;
        case HAS_TASK_EDIT:
            return isEmpty(getValue(TASK_EDIT));
        default:
            break;
    }
};

const addTaskEdit = (payload = {}) => {
    taskEditHandle(ADD_TASK_EDIT, payload);
};
const delTaskEdit = () => {
    taskEditHandle(DEL_TASK_EDIT);
};
const getTaskEdit = () => {
    return taskEditHandle(SELECT_TASK_EDIT);
};
const hasTaskEdit = () => {
    return !taskEditHandle(HAS_TASK_EDIT);
};

export { addTaskEdit, delTaskEdit, hasTaskEdit, getTaskEdit };
