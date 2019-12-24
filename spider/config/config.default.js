'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532656413112_8161';

  // 增加配置中间件
  // 把写在middleware里面的中间键挂进来
  // 在这里挂上了之后不用再写到路由里面了，他自己就生效了
  config.middleware = ['printdate','forbidip'];

  //给printdate中间件传入的参数
  config.printdate={

    aaa:'aaaaaa'
  }

  // forbidip中间键的配置参数
  config.forbidip={
    forbidips:[
      '127.0.0.1',
      '192.168.0.10'
    ]
  }



  


  // 配置ejs模板引擎
  config.view = {
    mapping: {
      '.html': 'ejs',
    }
  };


  // 配置公共的api
  config.api='http://www.phonegap100.com/';

  return config;
};
