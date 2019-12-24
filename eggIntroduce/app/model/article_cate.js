'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ArticleCate = app.model.define('article_cate', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    state: INTEGER  
  },{
    timestamps: false,  //关闭时间戳
    tableName: 'article_cate'    //配置表名称 
  });

  ArticleCate.associate = function (){
    // 1对1
    // 这个是定义在article_cate里面的，也就是查询的时候是查到一个article_cate再通过外键去找到其中一个article
    // 如果一个article_cate类里面有多个article，那么就重复再来一个相同的article_cate，再放下一个article
    // article_cate关联article，外键依然是cateId，在article里面

    // app.model.ArticleCate.hasOne(app.model.Article, {foreignKey: 'cateId'});

    // 1对多
    // 一个article_cate类里面有多个article返回的时候一个article_cate就把所有包含的article都返回了，就不逐个返回了
    app.model.ArticleCate.hasMany(app.model.Article, {foreignKey: 'cateId'});
       
  }
 

  return ArticleCate;
};