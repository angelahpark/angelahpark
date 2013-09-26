var homeController = require('../app/controllers/home.js');

module.exports = function (app) {
	app.get('/', homeController.index);
	// app.get('/resume', homeController.resume);
};