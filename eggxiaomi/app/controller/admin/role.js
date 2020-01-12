'use strict';

const BaseController = require('./base.js');

class RoleController extends BaseController {

	// 普通角色列表
	async index() {

		// 这里都找出来需要({})，不能直接()
		const result = await this.ctx.model.Role.findAll({});

		console.log(result);
		await this.ctx.render('admin/role/index', {
			// 这里不用往里面传.dataValues自动帮你序列化
			list: result,
		});
	}

	// 增加角色
	async add() {
		await this.ctx.render('admin/role/add');
	}


	async doAdd() {
		//  console.log(this.ctx.request.body);
		
		const role = await this.ctx.model.Role.create({
			title: this.ctx.request.body.title,
			description: this.ctx.request.body.description,
		});

		await this.success('/admin/role', '增加角色成功');
	}


	async edit() {

		const id = this.ctx.query.id;

		const result = await this.ctx.model.Role.findOne({ 
			id
		});

		await this.ctx.render('admin/role/edit', {
			list: result,
		});

	}

	async doEdit() {

		/*
			{ _csrf: 'b6TZ302c-LE44hFJ7LW9q3aBsmWztZXEA3Vw',
			_id: '5b8cecf5ebad41239888d3e9',
			title: '网站编辑111',
			description: '网站编辑222' }
			*/

		const id = this.ctx.request.body._id;
		const title = this.ctx.request.body.title;
		const description = this.ctx.request.body.description;

		const role = await this.ctx.model.Role.findOne({ id });

		await role.update({ 
			title,
			description
		})
		await this.success('/admin/role', '编辑角色成功');

	}

	async auth() {
		/*

			1、获取全部的权限

			2、查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中

			3、循环遍历所有的权限数据     判断当前权限是否在角色权限的数组中，   如果在角色权限的数组中：选中    如果不在角色权限的数组中不选中

		*/

		const role_id = this.ctx.request.query.id;

		const result = await this.service.admin.getAuthList(role_id);

		await this.ctx.render('admin/role/auth', {
			list: result,
			role_id,
		});

	}


	async doAuth() {
		/*
			1、删除当前角色下面的所有权限
	
			2、把获取的权限和角色增加到role_access表里面
	
		*/
		console.log(this.ctx.request.body);

		const role_id = this.ctx.request.body.role_id;

		const access_node = this.ctx.request.body.access_node;

		const AddData = [];  // [{}, {}, {}] 很多条数据

		// 1、删除当前角色下面的所有权限
		
		await this.ctx.model.RoleAccess.destroy({
			where: {
				role_id
			},
			force: true
		});


		// 组织一下数据一次性全部创建
		for (let i = 0; i < access_node.length; i++) {
			AddData.push({
				role_id,
				access_id: access_node[i],
			})
		}

		// 2、给role_access增加数据 把获取的权限和角色增加到数据库

		await this.ctx.model.RoleAccess.bulkCreate(AddData)


		await this.success('/admin/role/auth?id=' + role_id, '授权成功');


	}


}

module.exports = RoleController;
