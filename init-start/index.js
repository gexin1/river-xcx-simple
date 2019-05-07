import config from '../config/index';
import '../utils/promisify-finally';
//更新提示
import '../utils/update-app';

import req from '../api/index';

import * as promisify from '../utils/promisify';
//小程序配置
wx.$config = config;
//api请求
wx.$http = req;
//挂载 pify api
mountPifyApi();

wx.$shareMessage = () => {
    return {
        path: '/pages/index/index',
        imageUrl: `https://xcx-album-img.zmwxxcx.com/5ca6a1503cdf43a2960b6ca63986c449-thumbnail`,
        title: '写文章,晒图片,轻松赚钱'
    };
};

function mountPifyApi() {
    Object.keys(promisify).forEach(key => {
        wx[key] = promisify[key];
    });
}
