// egg里面用koa的中间键

// npm install koa-jsonp --save

// 首先要在middleware里面新建一个文件

// 然后把安装好的koa-jsonp导出
// 因为之前koa的中间键都是这么用的
// const jsonp = require('koa-jsonp')
// app.use(jsonp())
// 说明这个引入的jsonp中间键本身就是一个函数，我本来就要导出一个函数，所以直接导出就可以了


// 然后去配置里面配置
module.exports = require('koa-jsonp')

// 这个插件的作用是实现jsonp接口
// 传入的api后面加一个?callback=xxx
// http://localhost:7001/admin?callback=xxx
// 返回的就是;xxx("hi, admin"); 把ctx.body里面的东西当做参数用xxx函数执行


