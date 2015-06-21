var stormpathClient = require('../vendor/vendor.stormpathClient'),
	jwt = require('jsonwebtoken');

var ctrl = {
	post: function(req,res){
		var login = req.body.login, 
			password = req.body.password;

		// authenticate user in stormpath
		stormpathClient.getApp(function(app) {
			app.authenticateAccount({
				username: login,
				password: password,
			}, function (err, result) {
				if (err) 
					res.status(401).send(err.userMessage);

				var account = result.account;

				// genrate token
				var token = jwt.sign(account, stormpathClient.settings.API_KEY_SECRET, {
					expiresInMinutes: 1440 // expires in 24 hours
					//expiresInSeconds: 20
				});

				res.send(token);
			});
		});
	},
	get: function (req, res){
		var token = req.query.token || req.headers['authorization'];

		if (token) {
			if (token.split(' ').length > 1) {
				token = token.split(' ')[1];
			}

			// verifies secret and checks exp
			jwt.verify(token, stormpathClient.settings.API_KEY_SECRET, function(err, decoded) {      
				if (err) {
					res.status(401).send('Failed to authenticate token.');
				} else {
					// if everything is good, send the decoded response
					res.json(decoded);
				}
			});
		} else {
			res.status(403).send('No token provided.')
		}
	}	
};

module.exports = ctrl;