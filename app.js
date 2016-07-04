'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(methodOverride('_method'));

app.use(cookieSession({
  keys: [process.env.KEY1, process.env.KEY2, process.env.KEY3]
}));

app.use(cookieParser());

app.get('/', function(req,res) {
  res.send('Hello');
});

app.listen(3000);
