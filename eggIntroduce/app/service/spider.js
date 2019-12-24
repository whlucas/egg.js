'use strict';

const Controller = require('egg').Controller;

class SpiderController extends Controller {
  async requestUrl(url) {    
      // 抓取数据的接口抓取传入的url里面的所有东西
       var result = await this.ctx.curl(url);
       return result;

  }
}

module.exports = SpiderController;
