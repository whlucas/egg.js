'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, ANY } = app.Sequelize;

    const Access = app.model.define('access', {
        module_name: STRING, // 模块名称
        action_name: STRING, // 操作名称
        type: INTEGER, // 节点类型 :  1、表示模块   2、表示菜单     3、操作
        url: STRING,
        module_id: INTEGER, // 此module_id和当前模型的_id关联     module_id= 0 表示模块
        sort: {
            type: INTEGER,
            default: 100,
        },
        description: STRING,
        status: {
            type: INTEGER,
            default: 1,
        },

    }, {
        tebleName: 'access' // 表名
    });

    // 这里是自关联，自己的moudle_id = 0的数据有三个，每一个都moudle_id = 0的数据对应的id号 都有很多条数据的moudle_id与之对应，我先找到moudle_id = 0的三个数据，再去关联查找moudle_id等于这个三个数据的id号的数据

    // 自己关联自己，外键是module_id，一个module_id = 0的id下面对应了很多个module_id
    Access.associate = function () {
        app.model.Access.hasMany(app.model.Access, { foreignKey: 'module_id' });
    }



    return Access;
};