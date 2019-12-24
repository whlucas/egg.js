'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(255),
    description: INTEGER,
    cateId: STRING(30),
    state: DATE   
  },{
    timestamps: false,
    tableName: 'article'    
  });
 
  // 将这个article和article_cate关联
  // 关联好了就可以用关联查询了
  Article.associate = function (){
    // 这个article属于article_cate里面的一种，article_cate里面有多个article,所以用belongsTo
    // 外键在article里面，并且定义为cateId，意思是这个里面的cateId对应article_cate里面的主键id
    // 因为一个article只能查到一种article_cate，所以这个是一对一的关系
    app.model.Article.belongsTo(app.model.ArticleCate, {foreignKey: 'cateId'});
  }
 
  return Article;
};