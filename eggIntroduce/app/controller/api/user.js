'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = '用户接口api';
    }
}

module.exports = UserController;