'use strict';

// egg是一个mvc的框架
// model 模型           和数据打交道 查询数据库 请求数据  放在service里面
// view 视图            模板渲染  放在public里面的view文件夹里面
// controller控制器     负责处理一些业务逻辑

// 需要进行权限判断什么的用中间键写到middleware
// 插件方法什么的写到extend


// 控制器可以通过this随意调用服务，服务之间也可以相互调用
// 但是服务不能调用控制器，控制器不能相互调用

const BaseController = require('../core/base');

class HomeController extends BaseController {

	async index() {
		const { ctx } = this;

		// 这个页面有一些地方需要发post请求，用户访问这个就接口的时候需要生成一个秘钥传给前端的这个home页面，第二个参数传一个对象
		// 属性名随便取，属性值传一个csrf
		// this.ctx.csrf用户访问这个页面的时候生成的秘钥

		// await ctx.render('home', {
		//   csrf: this.ctx.csrf
		// })

		// 但是这样比较麻烦，我直接把这个this.ctx里面的这个csrf绑定到模板全局变量里面
		// 在模板里面还是按照之前的方式去拿，但是这里不用传了
		await ctx.render('home')

	}

	// 处理post的数据,处理这个请求的时候就会自动帮你处理这个csrf的验证
	async doLogin() {

		const { ctx } = this;
		console.log(ctx.request.body);

		// 生成这个controller的时候继承的是我自己写的类的话就可以直接调这个类的方法了

		// await ctx.render('public/success', {
		// 	redirectUrl: '/'
		// })

		await this.success('/')
		
	}

	// 注册
	async register() {
		await this.ctx.render('register');
	}

	async doRegister() {
		const { ctx } = this;
		console.log(this.ctx.request.body);

		// await ctx.render('public/error', {
		// 	redirectUrl: '/'
		// })
		await this.error('/')

	}

	// 操作cookie
	async setCookie() {
		const { ctx } = this;
		// 默认不配置的情况浏览器关闭即销毁
		// 默认情况下没法设置中文
		// 但cookie进行了加密，则可以设置中文cookie
		// cookie里面设置对象，需要先用JSON.stringify() 变成字符串存进去， 然后取出来再JSON.parse()
		ctx.cookies.set('username', '张三', { // key， value，第三个参数设置cookie的参数
			// 下面这几个一般都要传
			maxAge: 1000 * 3600 * 24, // 存一天
			httpOnly: true,
			signed: true, // 对这个cookie进行签名，防止用户修改这个cookie，当用户在浏览器修改这个cookie的时候，这个cookie就取不到了
			encrypt: true // 对cookie进行加密，就不是明文了，但是在取这个cookie的时候需要解密
		}) 

		// 清除cookie，key设置为null或者maxAge设为0
		ctx.cookies.set('name', null);

		// 跳转页面
		ctx.redirect('news')
	}

	// 设置session
	// 我设置这个session的时候它会给客户端设置一个cookie
	// 然后拿这个session的时候，是客户端会带着这个cookie去拿到session的值
	async setSession() {
		this.ctx.session.username = 'zhangsan'
		// session是基于cookie的，session的过期时间就是他设置的cookie的过期时间
		// 设置session的参数
		// this.ctx.session.maxAge = 60*1000*60*24

		// session的默认配置
		// exports.session = {
		// 	key: 'EGG_SESS', 
		// 	maxAge: 24 * 3600 * 1000,  
		// 	httpOnly: true, 
		// 	encrypt: true 
		// };

		// 建议在config.default.js里面统一配置
		// 去config.default.js里面看
	}
}

module.exports = HomeController;