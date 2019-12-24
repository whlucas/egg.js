
module.exports = app => {
    const { INTEGER, STRING } = app.Sequelize;

    const Lesson = app.model.define('lesson', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'lesson'
    });

    // 多对多的关系，学生与选课
    // 一个学生表，一个课程表，一个关联表
    // 只在两个表里面定义就行，不用再关联表中定义关联
    Lesson.associate = function () {
        // 一个学生可以选修多门课程 
        // 一门课程可以被多个学生选修
        // 第一个参数写学生这个表
        app.model.Lesson.belongsToMany(app.model.Student, {
            // through里面写关联表
            through: app.model.LessonStudent,
            // 外键先写自己这个里面的外键
            foreignKey: 'lessonId', //注意写法 下划线改为驼峰形式
            // 再写另外一个表的外键 
            otherKey: 'studentId'
        });
    }




    return Lesson;
}
