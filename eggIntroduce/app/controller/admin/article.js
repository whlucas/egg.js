'use strict';
const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = '后台文章管理列表';
    }

    async add() {
        const { ctx } = this;
        ctx.body = '后台文章增加文章';
    }

    async edit() {
        const { ctx } = this;
        ctx.body = '后台文章编辑';
    }
}

module.exports = ArticleController;