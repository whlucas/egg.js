'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const GoodsType = app.model.define('goods_type', {
        title: STRING,
        description: STRING,
        status: {
            type: INTEGER,
            defaultValue: 1
        }
    }, {
        tebleName: 'goods_type' // 表名
    });

    // // 商品类型属性表关联商品类型表，商品类型属性对应一个GoodsType，外键是cate_id
    // GoodsType.associate = function () {
    //     app.model.GoodsType.hasOne(app.model.GoodsTypeAttrbute, { foreignKey: 'cate_id' });
    // }

    return GoodsType;
};