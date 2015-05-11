// Get the packages we need
var express = require('express'),
	passport = require('passport'),
	cookieParser = require('cookie-parser'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
var dbName = "admin";
var dbPass = "loladmin"; 
var dbUrl = "mongodb://" + dbName + ":" + dbPass + "@ds061681.mongolab.com:61681/varnishdb"
mongoose.connect(dbUrl);
require('./config/passport')(passport);

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

require('./app/routes')(router, passport);

app.listen(3000);
console.log("Listening on 3000");