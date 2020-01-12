'use strict';


const path = require('path');
const fs = require('fs');

const pump = require('mz-modules/pump');

/*
1、安装mz-modules

https://github.com/node-modules/mz-modules

https://github.com/mafintosh/pump
*/

const BaseController = require('./base.js');
class FocusController extends BaseController {

	async index() {

		// 获取轮播图的数据

		const result = await this.ctx.model.Focus.findAll({});

		await this.ctx.render('admin/focus/index', {

			list: result,
		});
	}

	async add() {
		await this.ctx.render('admin/focus/add');
	}

	// 可以在配置里面配置允许上传的文件格式 config.multipart
	async doAdd() {

		// 接收传过来流中的文件

		// 单文件接收保存
		// 接收单文件用await this.ctx.getFileStream()
		// 可以拿到这个表单提交的其他数据
		// fields = stream.fields
		// 给一个路径,拼接上从流里面获取的文件名
		// const target = 'app/public/admin/upload' + path.basename(stream.filename)  path.basename就是只要后面的文件名，不要路径
		// 创建写文件的流，传入参数写到哪
		// const writeStream = fs.createWriteStream(target);
		// 写文件，用这个写没成功也不会卡死，这个包底层给你实现了报错就销毁的操作
		// await pump(stream, writeStream);
		// 或者，用这个写就得try catch 出错了自己去销毁这个流
		// stream.pipe(writeStream);

		// 注意上传单文件的时候，也就是用getFileStream这个来读取流的时候
		// 其他的东西也就是field里面的东西，最好不要放到文件表单的后面，放到前面去，否则可能拿不到

		// 加了autoFields: true这个数据就是还可以接收表单里面的其他数据，并且放到field里面
		const parts = this.ctx.multipart({ autoFields: true });
		let files = {};
		let stream;

		// 由于是多个文件，这里需要一个文件一个文件的读取，只要他没有读取完，就继续读取
		// 所以要写一个循环
		while ((stream = await parts()) != null) {

			// 没传文件就不要写文件了，直接退出
			if (!stream.filename) {
				break;
			}

			// 这个是表单的名字，文件名是filename
			const fieldname = stream.fieldname; // file表单的名字

			// 得到上传图片的目录,把文件名传入
			const dir = await this.service.tools.getUploadFile(stream.filename);
			const target = dir.uploadDir;

			// 创建写文件的流，传入参数写到哪
			const writeStream = fs.createWriteStream(target);

			// 写文件,用这个写文件，如果没成功也不会卡死
			// 文件存到指定的目录里面，url存到数据库里面，到时候调服务器里面的url来访问我这个服务器里面的文件
			await pump(stream, writeStream);

			// 把上传的文件整理成一个对象，因为需要把url存到数据库里面，方便别的地方调取访问
			// 如果有多个表单都要传文件，这里就有多个属性了，数据库表就要多配置几个属性，这里只有一个表单传文件，这里就只有一个属性，数据库里面就配置了这一个表单的的那么值
			files = Object.assign(files, {
				// 这里属性名是表单表的name，不是文件名，因为一次就一张图片，这个files里面循环完了也只有一个属性
				[fieldname]: dir.saveDir,
			});

		}

		// 这是两个表单都要传文件这里处理后的结果，属性名就是两个表单的name值
		// [{"focus_img":"/public/admin/upload/20180914/1536895826566.png"}，{"aaaa":"/public/admin/upload/20180914/1536895826566.png"}]


		// 把所有的文件名，文件目录，和表单里面的其他东西拼到一起写到数据库里面去
		await this.ctx.model.Focus.create(Object.assign(files, parts.field));

		// {"focus_img":"/public/admin/upload/20180914/1536895826566.png"，"title":"aaaaaaaa","link":"11111111111","sort":"11","status":"1"}

		await this.success('/admin/focus', '增加轮播图成功');


	}
	async edit() {

		const id = this.ctx.request.query.id;

		const result = await this.ctx.model.Focus.findByPk(id);

		await this.ctx.render('admin/focus/edit', {
			list: result,
		});

	}

	async doEdit() {

		const parts = this.ctx.multipart({ autoFields: true });
		let files = {};
		let stream;
		while ((stream = await parts()) != null) {
			// 因为这里没有传图片就跳过了，所以不修改图片的话就没有接下来的字段
			if (!stream.filename) {
				break;
			}
			const fieldname = stream.fieldname; // file表单的名字

			// 上传图片的目录
			const dir = await this.service.tools.getUploadFile(stream.filename);
			const target = dir.uploadDir;
			const writeStream = fs.createWriteStream(target);

			// 写入并销毁流，准备存下一个流里面的文件，所以要用pump来写
			await pump(stream, writeStream);

			files = Object.assign(files, {
				[fieldname]: dir.saveDir,
			});

		}

		// 修改操作

		const id = parts.field.id;


		const updateResult = Object.assign(files, parts.field);

		await this.ctx.model.Focus.update(updateResult, {
			where: {
				id
			}
		});

		await this.success('/admin/focus', '修改轮播图成功');


	}


}

module.exports = FocusController;
