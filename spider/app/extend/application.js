/*
外部可以通过 this.app.foo() 来调用我这个拓展的方法，app就是application
*/

module.exports = {
    foo(param) {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性

    //   console.log('----');
    //   console.log(this);

    return this.config.api;

    },
};