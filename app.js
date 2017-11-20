/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global passport, __dirname, mongoose */

// main.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var path = require('path');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var lessMiddleware = require('less-middleware');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var app = express();

// configuration ===============================================================
var configDB = require('./configurations/database.js');
mongoose.connect(configDB.url); // connect to our database

require('./configurations/passport')(passport); // pass passport for configuration
//var index = require('./routes/index');
//var users = require('./routes/users');

// set up our express application
app.use(logger('dev'));
app.use(cookieParser());// read cookies (needed for auth)
app.use(bodyParser.json());// get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}));
// uncomment after placing your favicon in /public
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');// set up ejs for templating
//    required for passport
app.use(session({
    secret: 'nodejssecretsessiontoken123456',
    resave: true,
    saveUninitialized: true
}));// session secret
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());// persistent login sessions
app.use(flash());// use connect-flash for flash messages stored in session
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.get('*', function (req, res) {
     console.log(__dirname);
     res.render(__dirname + "/public/index.html", {
         user: req.user
     });
 });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//
//// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
