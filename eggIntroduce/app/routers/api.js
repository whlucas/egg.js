'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;


    // api接口，都放到这个里面，把他们暴露出去
    router.get('/api/user', controller.api.user.index);
    router.get('/api/product', controller.api.product.index);

};
