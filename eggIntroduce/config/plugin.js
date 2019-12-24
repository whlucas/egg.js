'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 配置sequelize,这种方式配置也可以
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  }

};

// 想要用ejs插件要现在这里注册
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

