'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = '用户管理列表';
    }
}

module.exports = UserController;