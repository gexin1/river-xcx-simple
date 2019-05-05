import { ajax } from '../utils/util';
import config from '../config/index';
import { login } from './common-api';
const url = {
    yewu: {
        config: `${config.host}/gateway/api/tasks/add`,
        
        taskInfo: `${config.host}/gateway/api/user/task-info`, //作品详情

        taskIndexInfo: `${config.host}/gateway/api/tasks/info`, //作品详情

        taskList: `${config.host}/gateway/api/user/task-list`, //我参与的任务 列表

        taskUpload: `${config.host}/gateway/api/user/task-upload`, //作品上传
        taskSignup: `${config.host}/gateway/api/tasks/signup`, //作品上传

        publishTask: `${config.host}/gateway/api/user/publish-task`, //我发布的任务列表
        publishTaskInfo: `${config.host}/gateway/api/user/publish-task-info`, //我发布的任务详情列表

        taskAudit: `${config.host}/gateway/api/user/task-audit`, //作品/资质审核

        taskIndexList: `${config.host}/gateway/api/tasks/list`, //首页任务列表
        taskIndexAdList: `${config.host}/gateway/api/layout/index` //首页广告列表
    }
};

const taskIndexInfo = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskIndexInfo,
            Token,
            data,
            loading: true
        });
    });
};
const taskAdd = data => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.config,
            Token,
            loading: true,
            data: data,
            method: 'POST'
        });
    });
};

const taskList = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskList,
            Token,
            data
        });
    });
};

const taskInfo = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskInfo,
            Token,
            data,
            loading: true
        });
    });
};
const taskSignup = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskSignup,
            Token,
            data
        });
    });
};

const taskUpload = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskUpload,
            Token,
            data
        });
    });
};

const publishTask = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.publishTask,
            Token,
            data
        });
    });
};

const publishTaskInfo = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.publishTaskInfo,
            Token,
            data
        });
    });
};

const taskAudit = (data = {}) => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskAudit,
            Token,
            data
        });
    });
};

const taskIndexList = data => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskIndexList,
            Token,
            data: data
        });
    });
};

const taskIndexAdList = data => {
    return login().then(res => {
        let { Token } = res;
        return ajax({
            url: url.yewu.taskIndexAdList,
            Token,
            data: data
        });
    });
};
export default {
    taskAdd,
    taskList,
    taskInfo,
    taskSignup,
    taskUpload,
    publishTask,
    taskIndexList,
    taskIndexAdList,
    publishTaskInfo,
    taskAudit,
    taskIndexInfo
};
