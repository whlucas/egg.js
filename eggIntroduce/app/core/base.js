'use strict';


const Controller = require('egg').Controller;


// 这里自己写一个类，里面封装一些方法
// 到时候创建新的controller的时候继承这个类就好

class BaseController extends Controller {

  // 这个里面定义一些方法，在自己创建的constroller的时候调用起来就比较的方便
  async getUserInfo() {
    return{
        name:'张三',
        age:20
    }
  }

  async success(redirectUrl){
    await this.ctx.render('public/success',{
        redirectUrl:redirectUrl||'/'
    });

  }
  async error(redirectUrl){
        await this.ctx.render('public/error',{
            redirectUrl:redirectUrl||'/'
        });

  }


}

module.exports = BaseController;
