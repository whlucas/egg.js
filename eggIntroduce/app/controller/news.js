'use strict';
const Controller = require('egg').Controller;

class NewsController extends Controller {
    async index() {
        const { ctx } = this;
        // ctx.body = 'hi, news';

        // 配置好了ejs了之后访问这个网址的时候渲染指定的模板页面
        // 注意这是个异步方法
        // 下面这句话就是把这个view里面news页面返回

        const msg = 'ejs'
        // const list = ['111', '222', '333']

        // 调用服务里面的方法获取数据，这种方式在其他的控制器里面也可以用
        // 使得数据可以重复利用
        const list = await this.service.news.getNewsList()
        
        await ctx.render('news', {
            msg,
            list
        })

    }
    async content() {
        const { ctx } = this;

        // egg里面获取get的值，就是url里面问号后面的值
        const query = ctx.query  
        ctx.body = 'hi, content';
    }

    async newsList() {
        const { ctx } = this;

        // 获取动态路由的传值
        const id = ctx.params
        ctx.body = 'hi, newsList';
    }

    // 获取cookie
    async getCookie() {
        const { ctx } = this;
        // 如果我在设置cookie的时候对这个cookie进行了加密，那么我在这里取这个cookie的时候就需要进行解密, 在第二个参数里面传encrypt
        const username = ctx.cookies.get('username',{
            encrypt: true
        }) 
        await ctx.render('cookie', {
            username
        })
    }

    // 获取session
    // 我拿这个session的时候是客户端带着设置这个session的时候给客户端设置的cookie带着来访问这个值
    async getSession() {
        const username = this.ctx.session.username;
        await this.ctx.render('cookie', {
            username
        })
    }
}

module.exports = NewsController;