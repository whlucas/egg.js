'use strict';


// 服务的命名规则
// app / service / biz / user.js => ctx.service.biz.user （一般都这么写）
// app / service / sync_user.js => ctx.service.syncUser
// app / service / HackerNews.js => ctx.service.hackerNews

// 这个里面服务里面的this里面也可以拿到各种东西

const Service = require('egg').Service;

class NewsService extends Service {
    async getNewsList() {

        // 获取数据
        const list = ['111', '222', '333'];

        // 服务之间还可以相互调用,调用user服务的数据
        const user = await this.service.user.getUserInfo();
        console.log(user);

        return list;
    }
}

module.exports = NewsService;