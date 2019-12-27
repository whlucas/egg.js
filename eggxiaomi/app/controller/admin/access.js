'use strict';

const BaseController = require('./base.js');

// 权限管理的控制器
class AccessController extends BaseController {

	// 权限列表
	async index() {

		// var result=await this.ctx.model.Access.find({});

		// console.log(result);

		// 1、在access表中找出  module_id=0的数据 (模块)        管理员管理   权限管理   角色管理

		// 2、让access表和access表关联    条件：找出access表中  module_id等于id的数据

		// 这里是自关联，自己的moudle_id = 0的数据有三个，每一个都moudle_id = 0的数据对应的id号 都有很多条数据的moudle_id与之对应，我先找到moudle_id = 0的三个数据，再去关联查找moudle_id等于这个三个数据的id号的数据

		// 自己关联自己，外键是module_id，一个module_id = 0的id下面对应了很多个module_id
		const result = await this.ctx.model.Access.findAll({
			where: {
				module_id: '0'
			},
			include: {
				model: this.ctx.model.Access
			}
		});

		// 测试
		// this.ctx.body = result

		await this.ctx.render('admin/access/index', {
			list: result,
		});
	}

	// 增加权限
	async add() {
		// 获取模块列表
		const result = await this.ctx.model.Access.findAll({
			where: {
				module_id: 0
			}
		});
		await this.ctx.render('admin/access/add', {
			moduleList: result,
		});
	}

	async doAdd() {
		try {
			const addResult = this.ctx.request.body;

			await this.ctx.model.Access.create(addResult);

			await this.success('/admin/access', '增加权限成功');
		} catch (error) {

			console.log(error);

		}


	}

	// 编辑权限
	async edit() {

		const id = this.ctx.request.query.id;

		// 获取编辑的数据

		const accessResult = await this.ctx.model.Access.findByPk(id);


		const result = await this.ctx.model.Access.findAll({
			where: {
				module_id: 0
			}
		});


		await this.ctx.render('admin/access/edit', {
			list: accessResult,
			moduleList: result
		});
	}


	async doEdit() {
		console.log(this.ctx.request.body);

		/*
		{
		  id: '5b8e4422b3cc641f4894d7bc',
		  _csrf: '8F3tGQd8-w1HtBpsyUbnBSQY5Up7OOqHXYSY',
	
		  module_name: '权限管理111',
		  type: '3',
		  action_name: '增加权限1',
		  url: '/admin/access/add',
		  module_id: '5b8e3836f71aad20249c2f98',
		  sort: '100',
		  description: '增加权限---操作1111' 
		}
		*/
		const updateResult = this.ctx.request.body;

		const id = updateResult.id;

		const module_id = updateResult.module_id;


		// 菜单  或者操作
		if (module_id != 0) {

			updateResult.module_id = this.app.mongoose.Types.ObjectId(module_id); // 调用mongoose里面的方法把字符串转换成ObjectId

		}

		const result = await this.ctx.model.Access.updateOne({ _id: id }, updateResult);

		await this.success('/admin/access', '修改权限成功');


	}
}
module.exports = AccessController;
