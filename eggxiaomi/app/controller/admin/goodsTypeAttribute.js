const BaseController = require('./base.js');
class GoodsTypeAttributeController extends BaseController {
	async index() {

		// 显示对应类型的属性

		// 获取当前属性的类型id   分类id


		const cate_id = this.ctx.request.query.id;

		const goodsType = await this.ctx.model.GoodsType.findOne({
			where: {
				id: cate_id
			}
		})


		// 这里需要关联查询到GoodsType表中的类型
		const result = await this.ctx.model.GoodsTypeAttribute.findAll({
			where: {
				cate_id
			},
			include: {
				model: this.ctx.model.GoodsType
			}
		});

		await this.ctx.render('admin/goodsTypeAttribute/index', {
			list: result,
			cate_id,
			goodsType
		});
	}


	async add() {


		// 获取类型数据

		const cate_id = this.ctx.request.query.id;
		const goodsTypes = await this.ctx.model.GoodsType.findAll();

		await this.ctx.render('admin/goodsTypeAttribute/add', {

			cate_id,
			goodsTypes,

		});

	}

	async doAdd() {

		await this.ctx.model.GoodsTypeAttribute.create(this.ctx.request.body);

		await this.success('/admin/goodsTypeAttribute?id=' + this.ctx.request.body.cate_id, '增加商品类型属性成功');

	}


	// 功能还没有实现
	async edit() {

		const id = this.ctx.query.id;

		const result = await this.ctx.model.GoodsTypeAttribute.findOne({
			where: {
				id 
			}
		});

		const goodsTypes = await this.ctx.model.GoodsType.findAll();

		await this.ctx.render('admin/goodsTypeAttribute/edit', {

			list: result,
			goodsTypes,
		});

	}

	async doEdit() {


		const id = this.ctx.request.body.id;

		// var title=this.ctx.request.body.title;

		// var cate_id=this.ctx.request.body.cate_id;

		// var attr_type=this.ctx.request.body.attr_type;

		// var attr_value=this.ctx.request.body.attr_value;

		// console.log(this.ctx.request.body);


		await this.ctx.model.GoodsTypeAttribute.update(this.ctx.request.body, {
			where: {
				id
			}
		});

		await this.success('/admin/goodsTypeAttribute?id=' + this.ctx.request.body.cate_id, '修改商品类型属性成功');

	}

}
module.exports = GoodsTypeAttributeController;
