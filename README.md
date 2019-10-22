# 项目开发说明
## 技术框架
1. 前端采用`Typescript + vue + vuex + vue-router + vue-property-decorator + vuex-class + vuex-module-decorators`架构，兼容IE8+
2. 调试、开发、构建使用`Webpack 4.0 + vue-cli3`，支持Typescript + ES6语法
3. 项目已集成`Sass` `axios` `webpack-spritesmith` `postcss-px2rem`等插件或类库，详情请查看vue.config.js

## hybrid多页面项目及模块
1. 因为是内嵌页，不使用vue-router实现路由,所有的页面都采用直出的形式
2. 每个页面有自己的components,另外整个项目有自己公共的components供其他页面使用

## M端h5页面单页面项目及模块
1. m端h5页面以及嵌套使用vue-router,首页采用直出的形式，其他页面按需加载
2. 每个页面有自己的components,另外整个项目有自己公共的components供其他页面使用

## webpack-spritesmith
> 为了优化图标加载，项目使用`webpack-spritesmith`自动合并图标为sprite

### 使用方法
1. 安装`webpack-spritesmith`执行`npm install webpack-spritesmith --save`
2. 开发时将切图（1倍）放置`src/common/images/icon`目录，扩展名为**png**
3. 图标DOM的class以`icon-xxx`命名，xxx为图片名
4. 构建脚本会将icon下所有图片合并到一张sprite图上，并根据图片大小和定位，自动生成css代码

```
// 例如 images/icon/icon1.png,则页面dom为 <a class="icon-icon1"></a>
// 自动生成的css为
.icon { background-image: url(../images/sprite.png);background-size: 404px 266px;}
.icon-icon1 { width: 128px; height: 128px; background-position: 0px 0px; }

```
使用方法请参照'https://www.cnblogs.com/guangixn/p/10682131.html'

## postcss-px2rem
> vue项目利用postcss-px2rem适配不同屏幕,将px转换成rem

### 使用方法
1. 安装`postcss-px2rem`执行`npm install postcss-px2rem --save`
2. 开发过程中直接按照设计师给的设计稿的实际px写css即可。postcss-px2rem会自动转换
3. 在每个页面的index.html中插入一段脚本，脚本功能为根据dpr给html一个fongt-size值。

详情请参考'https://www.jianshu.com/p/8cb5fdce58bb'

## 异步请求guifan
1. 使用axios、async、await开发

### get和post请求接口
```
import request from "../common/script/utils/request";

/*
 * @Description: GET请求
 */
export function getHotProduct(params:any) {
  return request({
      url: "/market/prod/hot",
      method: "get",
      headers: {
          'Content-Type': 'application/json;charset=UTF-8'
      },
      params
  });
}
/*
 * @Description: POST请求
 */
export function orderConfirm(params:any) {
  return request({
      url: "/cart/add",
      method: "post",
      headers: {
          'Content-Type': 'application/json'
      },
      data: params
  });
}

```

### 调用方式 

```
async getProductList() {
    try {
      let params = {}
      let res = await getHotProduct(params)
      if (res.data.code === 0) {
        console.log("初始化商品",res);
      } else{
        console.log(res.data.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

```

## 目录结构及说明

```
|-- node_modules                    // 依赖包
|-- public                          // 页面模板
|-- src                             // 源码目录
|   |-- api                         // 各个页面异步请求的集合
|   |-- common                       // 页面的公共模块
|   |   |--font                     // 页面引用的公共字体，icon-fongt
|   |   |--images                   // 页面的公共图片
|   |   |   |--icon                 // 存放各个页面的图标，使用webpack-spritesmith拼成一张图
|   |   |--script                   // 页面引用的公共脚本
|   |   |   |--utils                // 页面的工具函数
|   |   |   |   |--request.ts       // 封装的axios请求拦截器
|   |   |--style                    // 页面引用的公共样式
|   |-- components                  // vue公共组件
|   |   | mixins                    // 一部分公共的方法或者计算属性
|   |-- pages                       // vue页面
|   |   |--home.vue                 // 首页
|   |   |   |  |public              // 页面需要的静态资源
|   |   |   |  |router              // 页面路由
|   |   |   |  |views               // 子页面
|   |   |   |  |components          // 子页面组件
|   |   |   |  |--index.vue         // 子页面入口文件
|   |   |   |-- App.vue             // hybrid模式根组件
|   |   |   |-- home.html           // 首页入口文件
|   |   |   |-- App.ts              // 首页目标浏览器配置表
|   |   |--About.vue                // 跳转页面
|   |-- store                       // 公共资源
|   |   |--moudules                 // 页面各个页面的vuex  
|   |   |--index.ts                 // 页面各个页面的vuex集合并引入vue
|   |-- shims-tsx.d.ts              // vue-cli初始化ts项目生成的shims-tsx.d.ts
|   |-- shims-vue.d.ts              // vue-cli初始化ts项目生成的shims-vue.d.ts
|   |-- App.vue                     // h5模式根组件
|   |-- main.ts                     // h5程序入口文件，加载各种公共组件
|--browserlistrc                    // 目标浏览器配置表
|-- static                          // 静态文件，比如一些图片，json数据等
|-- gitignore                       // git上传需要忽略的文件格式
|-- babelr.config.js                // ES6语法编译配置
|-- package-lock.json               // 锁定安装时的包的版本号
|-- package.json                    // 项目基本信息
|-- postcss.config.js               // postcss-pxtorem插件配置
|-- README.md                       // 项目说明
|-- tsconfig.json                   // 指定了用来编译ts项目的根文件和编译选项
|-- tslint.json                     // ts书写规范
|-- vue.config.js                   // webpack基本常用配置
```

## 常用命令
1. `npm run serve` 开发时使用，将启动本地服务
2. `npm run build` 构建项目，用于生产环境发布
