'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Role = app.model.define('role', {
        // 默认给你个主键
        // id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        title: STRING,
        description: STRING,
        
        status: {
            type: INTEGER,
            defaultValue: 1
        },
    }, {
        tebleName: 'role' // 表名
    });

    return Role;
};