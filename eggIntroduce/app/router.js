'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;

	app.beforeStart(async () => {
		await app.model.sync({ alter: false });
	})

	// 设置某一个路由的中间键
	// 首先获取这个中间键
	// 传到这个中间键方法里面的东西就是定义中间键函数的时候传进去的option
	const auth = app.middleware.auth({ attr: 'this is router.js middleware' });
	// 然后在想使用的路由里面放进去就可以了，可以放多个中间键
	router.get('/', auth, controller.home.index);

	// 还有一种路由的配制写法
	// 第一个参数是给这个路由起一个名字叫index，第二个是匹配的路径，和上面的那一行代码是一个意思
	// router.get('index', '/', auth, controller.home.index);


	router.get('/news', controller.news.index);
	router.get('/newsContent', controller.news.content);
	router.get('/newsList/:id', controller.news.newsList)
	router.get('/admin', controller.admin.index);
	router.post('/doLogin', controller.home.doLogin)

	router.get('/setCookie', controller.home.setCookie);
	router.get('/getCookie', controller.news.getCookie);

	router.get('/setSession', controller.home.setSession);
	router.get('/getSession', controller.news.getSession);

	router.post('/doRegister', controller.home.doRegister);
	router.get('/register', controller.home.register);

	router.get('/create', controller.sequelize.create);
	router.get('/findAll', controller.sequelize.findAll);
	router.get('/findKey', controller.sequelize.findKey);
	router.get('/update', controller.sequelize.update);
	router.get('/delete', controller.sequelize.delete);

	// 路由的内部重定向
	// 匹配到/add的时候给他重定向到/news，设置状态码302

	// 这种重定向有利于seo的优化，可以被搜索引擎监控？
	router.redirect('/add', '/news', 302)


	// 路由分组
	// 导入admin和api的接口
	require('./routers/admin')(app) // 这里吧app传进去执行，反正这里也要执行，也就是在这里执行那变的文件
	require('./routers/api')(app)
};
