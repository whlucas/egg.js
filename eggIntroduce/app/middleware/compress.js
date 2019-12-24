// 在介绍一个中间键koa-compress
// 开启页面压缩

// 看中间键的时候只要是
// app.use(xxx(yyy))这种形式的都是koa标准中间键，直接就可以像下面这么用
// 注意这种形式是中间键函数里面只有一个参数

module.exports = require('koa-compress')

// 导出之后就可以在配置里面配置这个中间键了



// 非标准的中间键
// 里面有两个参数了
// app.use(xxx(yyy, zzz))

// const webpackMiddleware = require('some-koa-middleware');

// // 暴露一个函数
// module.exports = (options, app) => {
//     // 函数里面return这个非标准的中间键 
//     // 传参就直接在里面传了，就不用去配置文件里面传了
//     return webpackMiddleware(options.compiler, options.others); 
// }
