'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    // 路由的分组，这个里面只放admin的路由，把他暴露出去
    router.get('/admin/user', controller.admin.user.index);

    router.get('/admin/article', controller.admin.article.index);
    router.get('/admin/article/add', controller.admin.article.add);
    router.get('/admin/article/edit', controller.admin.article.edit);

    router.get('/admin/product', controller.admin.product.index);
    router.get('/admin/product/add', controller.admin.product.add);
    router.get('/admin/product/edit', controller.admin.product.edit);
};
