'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const d = new Date();

    const User = app.model.define('user', {
        // 默认给你个主键
        // id: { type: INTEGER, primaryKey: true, autoIncrement: true },

        password: STRING,
        phone: INTEGER,
        last_ip: STRING,
        email: {
            type: STRING,
            unique: true,
            defaultValue: ''
        },
        status: { 
            type: DATE, 
            defaultValue: NOW 
        },
    },{
        // 其他的配置参数在这个里面写
        tebleName: 'user' // 表名
    });

    return User;
};