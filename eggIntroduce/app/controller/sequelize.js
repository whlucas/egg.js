'use strict';
const Controller = require('egg').Controller;

class AdminController extends Controller {
    async findAll() {
        const { ctx } = this;
        const userList = await ctx.model.User.findAll({
            where: {
                id: 1
            },
            attributes: ['id', 'username', 'age']
        })
        ctx.body = userList
    }

    // 添加数据
    async create() {
        const ctx = this.ctx; 
        // 这个里面可以拿到model
        const user = await ctx.model.User.create({ name: "李四", age: 20 }); 
        ctx.status = 201;
        ctx.body = user
    }

    // 依据主键查询数据
    async findKey() {
        const { ctx } = this;
        // 依据主键来查找数据
        const userList = await ctx.model.User.findByPk(1);
        ctx.body = userList
    }

    // 修改数据
    async update() {
        const { ctx } = this;
        // 首先获取一条数据
        const user = await ctx.model.User.findByPk(1);
        // 修改数据
        await user.update({"name": "王麻子", "sex": "女"})
        ctx.body = user
    }

    // 删除数据
    async delete() {
        const { ctx } = this;
        // 获取要删除的数据数据
        const user = await ctx.model.User.findByPk(1);
        if(!user){
            this.ctx.state = 404;
            return;
        }
        await user.destroy({
            force: true,  // force 控制是真实的物理删除，还是软删除，软删除只会在deleted_at的地方进行标记来说明他是被删除的，物理删除就是把这一条数据删了
        })
        ctx.body = '删除成功'
    }


    // 关联查询
    async belongsTo() {
        const { ctx } = this;

        // 我要查article里面的东西，用模型里面定义的关联外键查到articleCate里面的信息
        let result = await ctx.model.Article.findAll({
            // 这样他的查询结果里面就包含了articleCate里面的所有结果，以article_cate{xxx}这种形式返回
            include: {
                model: ctx.model.ArticleCate
            }
        });

        // 这种我就是查到article_cate的信息，然后在里面再填入关联的article信息，前提是做了关联
        // 依照关联方式决定查到数据的格式，因为一个article_cate里面可能有多个article，如果是hasOne就逐条显示，如果是hasMany就全部分组显示
        let result = await ctx.model.ArticleCate.findAll({
            include: {
                model: ctx.model.Article
            }
        });

        ctx.body = result;
    }

    async showAll() {
        const { ctx } = this;

        // 课程有哪些学生选修
        // 查找的结果就是每一个课程，里面还有所有选修每一门课程的学生的学生
        // let result = await ctx.model.Lesson.findAll({
        //   include: {
        //     model:  ctx.model.Student
        //   }
        // });   


        //每个学生选修了哪些课程
        let result = await ctx.model.Student.findAll({
            include: {
                model: ctx.model.Lesson
            }
        });
        ctx.body = result;
    }
}

module.exports = AdminController;