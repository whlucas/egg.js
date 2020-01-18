'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const GoodsTypeAttribute = app.model.define('goods_type_attribute', {
        cate_id: INTEGER,
        title: STRING,
        attr_type: STRING,  // 指定 1 input 2 textarea 3 select
        attr_value: STRING, // 默认值  input textarea 没有默认值 select有默认值， 多个默认值以回车隔开
        status: {
            type: INTEGER,
            defaultValue: 1
        }
    }, {
        tebleName: 'goods_type_attribute' // 表名
    });

    // 商品类型属性表关联商品类型表，商品类型属性对应一个GoodsType，外键是cate_id
    GoodsTypeAttribute.associate = function () {
        app.model.GoodsTypeAttribute.belongsTo(app.model.GoodsType, { foreignKey: 'cate_id' });
    }


    return GoodsTypeAttribute;
};