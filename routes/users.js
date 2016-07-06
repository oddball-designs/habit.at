'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

  // route for adding users
  router.get('/', function(req, res){
    console.log(req.customParams);
    res.send('hello world');
  });

module.exports = router;
