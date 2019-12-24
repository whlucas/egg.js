
/*

配置中间件
在config.default里面的config.middleware里面配置

*/

// 暴露一个方法，这个方法接收两个参数
// options: 中间件的配置项，框架会将 app.config[${ middlewareName }]传递进来。
// app: 当前应用 Application 的实例。
// 配置的时候在config.default里面这么写就写就行
// config.printdate = {
//     aaa: 'aaaaaa'
// }

module.exports = (options, app) => {
   
    console.log(options);
    // 在这里我打印options，它就打印出来我配置的{
    //     aaa: 'aaaaaa'
    // }

    // 返回一个异步的方法，这个方法接收ctx, next
    return async function printDate(ctx, next){
            console.log(new Date());
            await next();
    }

};