var stormpath = require('stormpath'),
	stormpathApp, callback;

var settings = {
	API_KEY: '1X92K34BOSFVS21I96U9FWKWN',//process.env['STORMPATH_API_KEY_ID'],
	API_KEY_SECRET: 'v2xFq87QHIU0rH4AwX3aPEo/czxXYPC2Whgp4Pu1zgY',//process.env['STORMPATH_API_KEY_SECRET']
	APP_URL: 'https://api.stormpath.com/v1/applications/3lfrSh32mMJSuc8vpSOeSZ' //process.env['STORMPATH_API_APP_URL'],;
};

//set up stormpath client
var apiKey = new stormpath.ApiKey(
  settings.API_KEY,
  settings.API_KEY_SECRET
);

var client = new stormpath.Client({apiKey: apiKey});

client.getApplication(settings.APP_URL, function(err, app) {
	console.log('getting stormpath app...');

	if (err) throw err;
    stormpathApp = app;

    if (typeof callback == 'function'){
    	callback(stormpathApp);
    }
});

module.exports = {
	settings: settings,
	getApp: function (cb) {
		if (typeof stormpathApp != 'undefined'){
			cb(stormpathApp);
		} else {
			callback = cb;
		}
	}
};
