var stormpathClient = require('../vendor/vendor.stormpathClient'),
	jwt = require('jsonwebtoken');

var ctrl = {
	post: function(req,res){
    //model validations
    try{
      var fullname = req.body.fullname.split(' ');
      var firstName = fullname[0];
      var lastName = '';
      for(var i=1; i<fullname.length; i++) {
        lastName += (i==1 ? '' : ' ') + fullname[i];
      }
    } catch (e) {
      res.status(400).send('Invalid Full Name, must provide both First Name and Last Name');
      return;
    }

    var accountModel = {
      givenName: firstName,//required
      surname: lastName,//required
      //username: 'tk421',
      email: req.body.email,//required
      password: req.body.password,//required
      /*customData: {
        favoriteColor: 'white',
      }*/
    };

    //create account in stormpath
    stormpathClient.getApp(function(app) {
      app.createAccount(accountModel, function(err, account) {
        if (err) {
          res.status(400).send(err.userMessage);
					return;
        }

        res.json(accountModel);
      });
    });
	}
};

module.exports = ctrl;
