/*

id    name              pid
1      手机               0
2      电脑               0
3      服装               0
4      小米1              1
5      小米2              2
6      小米笔记本         2
7      小米T恤            3


模块jimp


官方文档：


	https://github.com/oliver-moran/jimp


	https://github.com/oliver-moran/jimp/tree/master/packages/jimp


用法：

	1、安装  cnpm install --save jimp


	2、引入：var Jimp = require("jimp");


    3、使用


    var Jimp = require('jimp');


	// open a file called "lenna.png"
	Jimp.read('lenna.png', (err, lenna) => {
 		 if (err) throw err;
    		 lenna.resize(256, 256) // resize
   			 .quality(60) // set JPEG quality
   			 .greyscale() // set greyscale
    			.write('lena-small-bw.jpg'); // save
	});
*/


const fs = require('fs');

const pump = require('mz-modules/pump');

const BaseController = require('./base.js');
class GoodsCateController extends BaseController {
	async index() {

		const result = await this.ctx.model.GoodsCateType.findAll({
			include: {
				model: this.ctx.model.GoodsCate
			}
		});

		console.log(result[0].dataValues.goods_cates, 'result')
		await this.ctx.render('admin/goodsCate/index', {
			list: result,
		});

	}
	async add() {

		const result = await this.ctx.model.GoodsCateType.findAll({});

		await this.ctx.render('admin/goodsCate/add', {
			cateList: result,
		});

	}

	async doAdd() {
		// 上传图片注意前端需要设置enctype，csrf要用get传值的形式放到url里面
		const parts = this.ctx.multipart({ autoFields: true });
		let files = {};
		let stream;
		while ((stream = await parts()) != null) {
			if (!stream.filename) {
				break;
			}
			const fieldname = stream.fieldname; // file表单的名字

			// 上传图片的目录
			const dir = await this.service.tools.getUploadFile(stream.filename);
			const target = dir.uploadDir;
			const writeStream = fs.createWriteStream(target);

			await pump(stream, writeStream);

			files = Object.assign(files, {
				[fieldname]: dir.saveDir,
			});

			// 生成缩略图
			this.service.tools.jimpImg(target);
		}

		if(parts.field.pid == 0){
			const addData = {
				title: parts.field.title,
				description: parts.field.description
			}
			await this.ctx.model.GoodsCateType.create(addData);
		}else{
			await this.ctx.model.GoodsCate.create(Object.assign(files, parts.field));
		}
	
		await this.success('/admin/goodsCate', '增加分类成功');

	}


	async edit() {

		const id = this.ctx.request.query.id;

		const result = await this.ctx.model.GoodsCate.findOne({
			where: {
				id
			}
		});

		const cateList = await this.ctx.model.GoodsCateType.findAll();

		await this.ctx.render('admin/goodsCate/edit', {
			cateList,
			list: result,
		});

	}

	async doEdit() {

		const parts = this.ctx.multipart({ autoFields: true });
		let files = {};
		let stream;
		while ((stream = await parts()) != null) {
			if (!stream.filename) {
				break;
			}
			const fieldname = stream.fieldname; // file表单的名字

			// 上传图片的目录
			const dir = await this.service.tools.getUploadFile(stream.filename);
			const target = dir.uploadDir;
			const writeStream = fs.createWriteStream(target);

			await pump(stream, writeStream);

			files = Object.assign(files, {
				[fieldname]: dir.saveDir,
			});


			// 生成缩略图
			this.service.tools.jimpImg(target);

		}

		const id = parts.field.id;
		const updateResult = Object.assign(files, parts.field);

		if (parts.field.pid == 0) {
			const addData = {
				title: parts.field.title,
				description: parts.field.description
			}
			await this.ctx.model.GoodsCateType.update(addData,{
				where: {
					id
				}
			});
		} else {
			await this.ctx.model.GoodsCate.update(updateResult,{
				where: {
					id
				}
			});
		}

		await this.success('/admin/goodsCate', '修改分类成功');

	}


}
module.exports = GoodsCateController;
