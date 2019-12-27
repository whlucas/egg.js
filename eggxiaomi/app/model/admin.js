'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Admin = app.model.define('admin', {
        // 默认给你个主键
        // id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: STRING,
        password: STRING,
        mobel: INTEGER,
        email: {
            type: STRING,
            // unique: true,
            defaultValue: ''
        },
        status: { 
            type: INTEGER, 
            defaultValue: 1 
        },
        is_super: { // 是否是超级管理员      1表示超级管理员
            type: INTEGER,
            defaultValue: 0 
        }, 
        // 这个是用户，他需要和角色表关联，这是个外键
        role_id: INTEGER, //   角色id
    }, {
        tebleName: 'admin' // 表名
    });

    // 管理员表关联角色表，一个角色有很多管理员用belongsTo，外键是role_id
    Admin.associate = function () {
        app.model.Admin.belongsTo(app.model.Role, { foreignKey: 'role_id' });
    }

    return Admin;
};