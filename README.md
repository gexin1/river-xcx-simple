# mini-lib-simple

### 文件夹规范

* api 
   * common-api  
     * 项目所有的公共api 存放
   * *-api 
     * 项目其他api 存放
* lib 
  * 存放项目公共的一些依赖
* template 
  * 一些公共的template 模版文件
* utils
  * promisify.js
    * 一些api 返回变为promise 同时在初始化启动的时候把 
    * pify*的api挂载在wx对象上
    * 跳转路由可以使用 pify 封装promise话的路由
  * promisify-finally.js
    * 给promise增加finally兼容 初始化的时候会加上
  * util.js
    * 一些公共方法存放
  * util.wxs
    * 一些公共的wxs存放
  * update-app.js
    * 小程序更新后提示用户重启更新 默认在init-start引入
* config.js 
  * 项目公共配置
* data-statistics
  * 里边可以封装对项目的埋点
* init-start 
  *  初始化启动 会把promise的api挂载在wx上
* store 
  *  全局数据存储


### 项目格式

* js 使用 vscode pretter
* wxml fromat  使用 vscode wxml

### 优化
[腾讯文档优化建议](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

### project.config.json 配置
打包忽略配置文件 [如何配置](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html)

### JS
``` javascript
//setData 直接使用key修改
//不在页面渲染的数据的使用_data来保存变量
Page({
    data:{
        user:{
            name:'uzi'
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
### wxml

* 图片使用image和background-image选择 [点击打开=>渲染图片性能测试](https://developers.weixin.qq.com/s/QAQUO9mf748u)
* 注意不要渲染太多的节点
  * 想办法销毁一部分节点使用wx:if

### 组件

* swiper
> 节点数量太多和用户滑动太快,会卡死

### 原生组件

* camera
* canvas
* input（仅在focus时表现为原生组件）
* live-player
* live-pusher
* map
* textarea
* video
>原生组件可以在scroll-view 里边滚动 但是原生组件的宽高不能和scroll-view一样大小
### api

```
wx.chooseImage 
```
> sizeType 没什么作用  安卓图片会比较小  ios 会比较大

> 因为这个api 调用的是原生组件有时候在部分会比较卡 具体表现为选择完图片会卡住等一会才会到成功回调

```
wx.showToast
```
> wx.showToast 在wx.hideloading 之前会被快速关闭

### wxss

* flex 布局
* grid 布局





