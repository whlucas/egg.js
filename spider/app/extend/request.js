/*
外部可以通过 this.ctx.request.foo() 来访问
*/

module.exports = {
    foo(param) {
        // this就是原来的request对象
        // console.log(this);
        
        return this.header.host;

    },
  };