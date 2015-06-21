var express = require('express');

var routes = function () {
	var router = express.Router();

	var authCtrl = require('../controllers/controllers.auth');

	router.route('/')
		.get(authCtrl.get)
		.post(authCtrl.post);

	return router;
};

module.exports = routes;