/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api/users', require('./auth.js')(router));
    app.use('/api', require('./users.js')(router));
	app.use('/api', require('./user_id.js')(router));
    app.use('/api', require('./items.js')(router));
	app.use('/api', require('./item_id.js')(router));
};
