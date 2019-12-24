'use strict';
const Controller = require('egg').Controller;

class ProductController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = '商品接口';
    }

}

module.exports = ProductController;