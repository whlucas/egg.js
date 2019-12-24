'use strict';
const Controller = require('egg').Controller;

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    // 注意egg这里返回给客户端信息用的是this.ctx.body
    // koa用的是ctx.body
    ctx.body = 'hi, admin';
  }
}

module.exports = AdminController;