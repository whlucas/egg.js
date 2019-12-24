module.exports = (option, app) => {
    return async function auth(ctx, next) {
        // 如果session存在表示登录了

        console.log(1111)
        if(ctx.session && ctx.session.username){
            await next()
        }else {
            // 不存在则跳转，这种跳转方式叫外部重定向
            // 跳转到的这个页面请求不要使用这个中间键

            // 这种跳转默认是临时重定向，返回的是302
            // 如果要改状态码改成永久重定向
            ctx.status = 301
            ctx.redirect('/')
        }
    }
}