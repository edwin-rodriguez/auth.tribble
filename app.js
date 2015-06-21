var express = require('express'),
	bodyParser = require('body-parser');

//create app
var app = express();

//set up body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//custom routes
var authRoutes = require('./routes/routes.auth')();
app.use('/authenticate', authRoutes);

//root route
app.get('/', function(req, res){
	res.send('hello tribble auth!');
});

//launch
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log(process.env);
	console.log('Tribble Auth app listening at port ' + port + '...');
});

module.exports = app;