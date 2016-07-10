var express = require('express'),
	authCtrl = require('../controllers/controllers.auth'),
	signupCtrl = require('../controllers/controllers.signup');

var routes = function () {
	var router = express.Router();

	//authenticate
	router.route('/authenticate')
		.get(authCtrl.get)
		.post(authCtrl.post);

	//signup
	router.route('/signup')
		.post(signupCtrl.post);

	return router;
};

module.exports = routes;
