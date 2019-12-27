'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	app.beforeStart(async () => {
		await app.model.sync({ alter: false });
	})



	require('./router/admin')(app);

	require('./router/default')(app);
};
