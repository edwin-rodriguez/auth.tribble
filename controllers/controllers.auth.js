var stormpathClient = require('../vendor/vendor.stormpathClient'),
	jwt = require('jsonwebtoken');

function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
};


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
				if (err) {
					res.status(401).send(err.userMessage);
					return;
				}

				//load full Account object
				stormpathClient.client.getAccount(result.account.href, function(err, account) {
					//load custom data
					account.getCustomData(function(err, customData) {
						//extend customdata property of current account object
				    extend(account.customData, customData);

						// genrate token
						var token = jwt.sign(account, stormpathClient.settings.API_KEY_SECRET, {
							expiresIn: 7200 //seconds = 2 hours
						});

						res.send(token);
				  });
				});
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
