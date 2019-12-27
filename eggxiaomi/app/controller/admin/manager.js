'use strict';

const BaseController = require('./base.js');

class ManagerController extends BaseController {

	// 管理员列表
	async index() {
		// 查询管理员表并管理角色表
		const result = await this.ctx.model.Admin.findAll({
			include: {
				model: this.ctx.model.Role
			}
		});
		console.log(result);
		await this.ctx.render('admin/manager/index', {

			list: result,
		});

	}

	// 增加管理员
	async add() {
		// 要获取一下角色返回给前端，让前端填表
		const roleResult = await this.ctx.model.Role.findAll({});
		await this.ctx.render('admin/manager/add', {
			roleResult,
		});

	}

	async doAdd() {
		console.log(this.ctx.request.body);

		const addResult = this.ctx.request.body;
		addResult.password = await this.service.tools.md5(addResult.password);


		// 判断当前用户是否存在

		const adminResult = await this.ctx.model.Admin.findOne({
			where: {
				username: addResult.username
			}
		});

		console.log(addResult)

		if (adminResult) {
			await this.error('/admin/manager/add', '此管理员已经存在');
		} else {

			await this.ctx.model.Admin.create(addResult);

			await this.success('/admin/manager', '增加用户成功');

		}
	}

	async edit() {

		// 获取编辑的数据

		const id = this.ctx.request.query.id;

		// 获取管理员
		const adminResult = await this.ctx.model.Admin.findByPk(id);

		// 获取角色
		const roleResult = await this.ctx.model.Role.findAll({});

		await this.ctx.render('admin/manager/edit', {

			adminResult,

			roleResult,
		});
	}


	async doEdit() {

		// console.log(this.ctx.request.body);

		const id = this.ctx.request.body.id;
		let password = this.ctx.request.body.password;
		const mobile = this.ctx.request.body.mobile;
		const email = this.ctx.request.body.email;
		const role_id = this.ctx.request.body.role_id;

		const result = await this.ctx.model.Admin.findByPk(id);

		if (password) {
			// 修改密码
			password = await this.service.tools.md5(password);
			await result.update({
				password,
				mobile,
				email,
				role_id,
			})
		} else {
			await result.update({
				mobile,
				email,
				role_id,
			})
		}
		await this.success('/admin/manager', '修改用户信息成功');
	}
}

module.exports = ManagerController;
