'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, ANY } = app.Sequelize;

    const Focus = app.model.define('focus', {
        title: STRING,
        type: INTEGER,
        focus_img: STRING,
        link: STRING,
        sort: INTEGER,
        status: { 
            type: INTEGER,
            defaultValue: 1 
        }
    }, {
        tebleName: 'focus' // 表名
    });

    return Focus;
};