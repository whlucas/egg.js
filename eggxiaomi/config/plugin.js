'use strict';

// had enabled by egg
// exports.static = true;

// 可以多模板引擎配合使用

exports.ejs = {
	enable: true,
	package: 'egg-view-ejs',
};

exports.nunjucks = {
	enable: true,
	package: 'egg-view-nunjucks',
};


// exports.mongoose = {
//   enable: true,
//   package: 'egg-mongoose',
// };

exports.redis = {
	enable: false,
	package: 'egg-redis',
};



// 配置sequelize,这种方式配置也可以
exports.sequelize = {
	enable: true,
	package: 'egg-sequelize',
}
