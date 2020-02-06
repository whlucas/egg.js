'use strict';

// 配置好了直接在这里面定义表
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const GoodsCate = app.model.define('goods_cate', {
        title: STRING,  // 分类标题
        cate_img: STRING, // 分类图片
        filter_attr: STRING, // 筛选id 和goods_cate关联，用于筛选
        link: STRING, // 跳转链接地址
        template: STRING, // 指定当前分类的显示模板
        pid: INTEGER,  // 指定上级分类，用于自关联
        sub_title: STRING,   // seo 的标题 关键字 描述
        keywords: STRING,
        description: STRING,
        sort: INTEGER,
        status: {
            type: INTEGER,
            defaultValue: 1
        }
    }, {
        freezeTableName: true // 使用默认表名，不会变复数
    });


    GoodsCate.associate = function () {
        app.model.GoodsCate.belongsTo(app.model.GoodsCateType, { foreignKey: 'pid' });
    }


    return GoodsCate;

};