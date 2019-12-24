'use strict';


// 这个里面服务里面的this里面也可以拿到各种东西
// 服务之间还可以相互调用

const Service = require('egg').Service;

class UserService extends Service {
    async getUserInfo() {

        return {
            name: '张三'
        };
    }
}

module.exports = UserService;