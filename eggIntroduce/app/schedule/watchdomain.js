//  cheerio模块的使用 
// 用来解析抓取到的html代码，拿到想要的内容

/*
 1、安装cnpm i cheerio --save

 2、引入cheerio模块  
 
 3、加载要解析的内容
    const $ = cheerio.load('<h2 class="title">Hello world</h2>')

4、用法
 
 $('title').html()   获取了要匹配的标题的内容


5、获取的汉子是乱码 


 const $ = cheerio.load('<h2 class="title">Hello world</h2>',{decodeEntities: false})



*/


const cheerio=require('cheerio');

module.exports = (app) => {
    return {

        schedule: {
            interval: '5s', // 1 分钟间隔
            type: 'all',
            disable:true
        },

        async task(ctx) {
            // 1、抓取网站内容
            var url = "https://news.baidu.com/";

            // 每隔一段时间调用这个方法去抓取数据
            var result = await ctx.service.spider.requestUrl(url);

            var htmlData = result.data.toString();

            // 2、解析数据

            // 检测网站是否被篡改     检测网站是否挂掉

            // 我现在想要拿到他标题里面的东西，一种方法是我给他转成字符串了之后去用正则匹配拿到title标签里面的东西

            // 还有一种就是用这个cheerio的插件
            // 第二个参数解决了解析出来的汉字是乱码的问题
            const $ = cheerio.load(htmlData, { decodeEntities: false });

            // 取里面的东西和jq的语法相同
            var title = $('title').html();

            console.log(title, 'title')

            if (title != '百度新闻——海量中文资讯平台') {
                console.log('网站挂掉了 或者被修改了');
            } else {
                console.log('正常')
            }

            //获取到了hotnews下面所有的a标签的内容
            $('.hotnews a').each(function () {
                // 遍历每一条
                console.log($(this).html());
            })
        }
    }
}