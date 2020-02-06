'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER} = app.Sequelize;

    const GoodsCateType = app.model.define('goods_cate_type', {
        title: STRING,  // 分类标题
        description: STRING,
    }, {
        freezeTableName: true // 使用默认表名，不会变复数
    });

    GoodsCateType.associate = function () {
        app.model.GoodsCateType.hasMany(app.model.GoodsCate, { foreignKey: 'pid' });
    }

    return GoodsCateType;
};