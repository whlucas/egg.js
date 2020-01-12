// 父类

'use strict';


// 定义一个自己的controller，其他的都继承这个controller就可以用这个里面的方法了
const Controller = require('egg').Controller;

class BaseController extends Controller {
	async success(redirectUrl, message) {

		// this.ctx.body='成功';

		await this.ctx.render('admin/public/success', {
			redirectUrl,
			message: message || '操作成功!',
		});


	}

	async error(redirectUrl, message) {

		// this.ctx.body='成功';

		await this.ctx.render('admin/public/error', {
			redirectUrl,
			message: message || '操作成功!',
		});

	}

	async verify() {

		// 这里前台登录后台登录都要用这个码，所以可以提出来
		const captcha = await this.service.tools.captcha(); // 服务里面的方法

		this.ctx.session.code = captcha.text; /* 验证码的信息*/

		this.ctx.response.type = 'image/svg+xml'; /* 指定返回的类型*/

		this.ctx.body = captcha.data; /* 给页面返回一张图片*/


	}

	// 封装一个删除方法
	// 所有的删除都用这个方法
	async delete() {

		/*
		  1、获取要删除的数据库表   model
	
		  2、获取要删除数据的id   _id
	
		  3、执行删除
		  
		  4、返回到以前的页面           ctx.request.headers['referer']   (上一页的地址)  
		*/

		// 这两个参数是url传过来的
		const model = this.ctx.request.query.model; // Role
		const id = this.ctx.request.query.id;

		const result = await this.ctx.model[model].destroy({  // 用这种方式拿到传进来的model
			where: {
				id
			},
			force: true 
		});

		if (!result) {
			this.ctx.state = 404;
			return;
		}

		// 上一个地址从中间键里面取
		this.ctx.redirect(this.ctx.state.prevPage);
	}

	// 改变状态的方法  Api接口
	async changeStatus() {

		const model = this.ctx.request.query.model;  /* 数据库表 Model*/
		const attr = this.ctx.request.query.attr;  /* 更新的属性 如:status is_best */
		const id = this.ctx.request.query.id; /* 更新的 id*/

		const result = await this.ctx.model[model].findOne({ id });

		if (result) {


			if (result[attr] == 1) {

				var json = {

					[attr]: 0,
				};

			} else {
				var json = {
					[attr]: 1,
				};

			}

			// 执行更新操作

			const updateResult = await this.ctx.model[model].update(json, {
				where: {   // 这里第二个参数不能简写
					id
				}
			});

			if (updateResult) {
				this.ctx.body = { message: '更新成功', success: true };
			} else {

				this.ctx.body = { message: '更新失败', success: false };
			}

		} else {

			// 接口
			this.ctx.body = { message: '更新失败,参数错误', success: false };


		}


	}


	// 改变数量的方法
	async editNum() {

		const model = this.ctx.request.query.model; /* 数据库表 Model*/
		const attr = this.ctx.request.query.attr; /* 更新的属性 如:sort */
		const id = this.ctx.request.query.id; /* 更新的 id*/
		const num = this.ctx.request.query.num; /* 数量*/

		const result = await this.ctx.model[model].findByPk(id);

		if (result) {

			const json = {/* es6 属性名表达式*/

				[attr]: num,
			};

			// 执行更新操作
			const updateResult = await this.ctx.model[model].update(json, {
				where: {
					id
				}
			});

			if (updateResult) {
				this.ctx.body = { message: '更新成功', success: true };
			} else {

				this.ctx.body = { message: '更新失败', success: false };
			}

		} else {

			// 接口
			this.ctx.body = { message: '更新失败,参数错误', success: false };


		}


	}


}

module.exports = BaseController;
