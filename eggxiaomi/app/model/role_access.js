'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const RoleAccess = app.model.define('role_access', {
        access_id: INTEGER,
        role_id: INTEGER
    }, {
        tebleName: 'role_access' // 表名
    });

    return RoleAccess;
};