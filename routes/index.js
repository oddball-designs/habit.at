'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;

router.get('/new', function(req, res, next){
  res.render('new_account');
})
