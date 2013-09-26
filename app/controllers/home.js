var request = require('request');
var exports = module.exports = {};

exports.index = function (req, res) {
	console.log(res.params);
	res.render('home/index', {route: req.route.path});
};