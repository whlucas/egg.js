// 定时任务的另外一种简写的形式

// var k=110;
// module.exports={

//     schedule: {
//         interval: '5s', // 1 分钟间隔
//         type: 'all', // 指定所有的 worker 都需要执行
//     },

//     async task(ctx) {
//         ++k;
//         console.log(k)
//     }
// }




// 还可以有一种写法，去暴露一个方法，里面可以传app

var k=110;
module.exports=(app)=>{
    return{

        schedule: {
            interval: '5s', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行,
            disable:true
        },
    
        async task(ctx) {
            ++k;

            // 这个里面可以调一些个方法
            var result=await ctx.service.news.getNewsList()
            console.log(result)

            console.log(k)
        }
    }
}