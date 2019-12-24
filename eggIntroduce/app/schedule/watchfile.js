// 写一个定时任务，首先引入

const Subscription = require('egg').Subscription;

let i = 0;

class WatchFile extends Subscription {

	// 通过类里面的 schedule 属性来设置定时任务的执行间隔等配置
	// 固定写法
	static get schedule() {
		return {
			interval: '2s', // 两秒执行一次
			type: 'all',   // 指定所有的 worker（进程）  都需要执行这个定时任务
            disable:true
		}
	}

	//定时任务执行的操作
	async subscribe() {
		++i;
		console.log(i);

		// 可以直接this.ctx就可以拿到一些方法
		//   var result=await this.ctx.service.news.getNewsList()
		//   console.log(result)

	}


}

// 暴露出去
module.exports = WatchFile;