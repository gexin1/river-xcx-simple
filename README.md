### 种草主义

#### 页面路径
| 页面名字 |             路径              |
| -------- | :---------------------------: |
| 首页     |      /pages/index/index       |
| 发布任务 | pages/task-release/task-release |
| 任务详情 | pages/task-detail/task-detail |
#### Tip

#### format 格式
> 使用 vscode pretter
> wxml fromat  使用 vscode wxml
#### 图片
> 使用网络图片
##### css 
> 使用"-"分割class
> 使用flex布局
#### js
> promise 增加 finally
> 初始化的时候会把所有promisify里边的api 挂载在 wx对象上边
> 对于navigateTo=>pifyNavigateTo增加query参数
``` javascript
//setData 直接使用key修改
//不渲染的数据的使用_data
Page({
    data:{
        user:{
            name:'wang'
        }
    },
    _data:{},
    onLoad(){
        this.setData({
            [`user.name`]:'ming'
        });
    }
})
```

#### 文件夹规范
```
api //接口
lib //项目依赖库
template //wxml模版
utils //公共方法
config.js //项目公共配置
data-statistics //数据埋点 
init-start //初始化启动 会把promise的api挂载在wx上
store  //全局数据存储 使用app.globalData 做全局储存
```

#### 2018-11-12 基础库用户占比

```
2.4.0  82.65%
2.3.2  4.32%
2.3.0  0.24%
2.2.5  7.29%
2.0.9  2.11%
total  96.61%
1.9.97 1.83%

```
