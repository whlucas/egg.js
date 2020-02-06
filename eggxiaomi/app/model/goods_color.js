'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const GoodsColor = app.model.define('goods_color', {
        color_name: STRING,
        color_value: STRING,
        status: {
            type: INTEGER,
            defaultValue: 1
        }
    });

    return GoodsColor;
};