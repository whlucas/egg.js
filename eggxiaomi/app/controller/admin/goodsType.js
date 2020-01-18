const BaseController = require('./base.js');
class GoodsTypeController extends BaseController {
	async index() {

		// 查询商品类型表
		const result = await this.ctx.model.GoodsType.findAll();
		await this.ctx.render('admin/goodsType/index', {
			list: result,
		});
	}


	async add() {

		await this.ctx.render('admin/goodsType/add');

	}

	async doAdd() {

		this.ctx.model.GoodsType.create(this.ctx.request.body);

		await this.success('/admin/goodsType', '增加类型成功');

	}


	async edit() {


		const id = this.ctx.query.id;

		const result = await this.ctx.model.GoodsType.findOne({ id });

		await this.ctx.render('admin/goodsType/edit', {

			list: result,
		});

	}

	async doEdit() {

		const id = this.ctx.request.body.id;
		const title = this.ctx.request.body.title;
		const description = this.ctx.request.body.description;

		await this.ctx.model.GoodsType.update({
			title,
			description,
		},
		{
			where: {
				id
			}
		});
		await this.success('/admin/goodsType', '编辑类型成功');

	}

}
module.exports = GoodsTypeController;
