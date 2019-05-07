import { ajax } from '../utils/util';
import config from '../config/index';
import { login } from './common-api';
const url = {
    yewu: {
        taskInfo: `${config.host}/gateway/api/user/task-info` //作品详情
    }
};
//请求任务详情
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
export default {
    taskInfo
};
