'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(255),
        age: INTEGER,
        sex: STRING(30),
        created_at: DATE,
        updated_at: DATE,
    },{
        // 其他的配置参数在这个里面写
        tebleName: 'users' // 表名
    });

    return User;
};