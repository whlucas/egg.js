/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	// 这个是配置cookie加密的秘钥的
	config.keys = appInfo.name + '_1576399123158_5283';

	// 配置中间键,这个里面配置的中间键所有的路由都会用到
	config.middleware = ['auth', 'jsonp', 'compress', 'adminAuth']; // 注意中间键是以admin_auth命名的，这里要改成驼峰的形式
	// 往auth中间键的option里面传参
	config.auth = {
		title: 'this is auth'
	}

	// 配置中间键的参数

	// 中间键的通用配置
	// 所有的中间键都可以有这几个通用的配置
	// enable：控制中间件是否开启。    这个配置对egg内置的中间键比较有用
	// match：设置只有符合某些规则的请求才会经过这个中间件。  可以去选择配置路由中间键，也可以在这里配置
	// ignore：设置符合某些规则的请求不经过这个中间件。他和ignore不能同时使用
	config.compress = {
		threshold: 1024, //它支持指定只有当 body 大于配置的 threshold 时才进行 gzip 压缩  可以不传，默认就是这个数
		enable: false,
		// match: '/news', // news路由才会匹配

		// 不光可以像上面那么写，还可以写一个方法
		match(ctx) {
			// ctx可以获取请求地址什么的 
			if (ctx.request.url == 'shop' || ctx.request.url == 'news') {
				return true;
			}
			return false;
		}
		// ignore: '/news', 
	}

	// 配置adminAuth插件
	config.adminAuth = {
		match: '/admin' // 只要路由里面有这个就用这个中间键
	}

	// 配置模板引擎，告诉egg view里面用这个模板
	config.view = {
		mapping: {
			// 这里可以配置文件的后缀名，后缀名为html的文件用ejs模板引擎来处理
			'.html': 'ejs',
		}
	};

	// 在这里定义在config上面的属性，可以在其他地方通过this.config.api来取到
	config.api = 'http://www.baidu.com.com';

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	// 配置默认的session配置，除了key都和cookie的配置属性基本相同
	config.session = {
		key: 'EGG_SESS',
		renew: true,  // 这个为true表示，每次刷新页面的时候这个session都会被重置过期时间

		maxAge: 24 * 3600 * 1000,
		httpOnly: true,
		encrypt: true
	}

	// 框架自带中间键的默认配置
	config.bodyParser = {
		jsonLimit: '10mb'  // post传值的最大容量 默认是1mb 
	}

	// 配置数据库的链接
	config.sequelize = { 
		dialect: 'mysql', 
		host: 'localhost', 
		port: 3306, 
		database: 'egg', 
		username: "root", 
		password: "Lll-13999520192" ,
		logging: console.log, // 显示原始的命令行
	};

	return {
		...config,
		...userConfig,
	};
};
