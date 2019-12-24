// 访问任意的路由都要把这个this.ctx.csrf全局变量放到我的html模板里面去


// 我这里设置完之后所有的请求就都把我这个csrf绑定到模板的全局变量里面了
module.exports = (option, app) => {
    // 返回一个异步函数
    return async function auth(ctx, next) {
        // 设置模板的全局变量
        // 这么设置了之后就相当于给模板默认传了这个值，在模板里面照常的去拿这个值，但是controller里面就不用传了
        ctx.state.csrf = ctx.csrf

        // console.log(option)
        await next();
    }
}