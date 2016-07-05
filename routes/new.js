'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');


router.get('/', function(req, res, next){
  knex('households').select('id', 'name')
  .then(function(data){
    console.log(data);
    res.render('new_account', {households: data});
  })
});




module.exports = router;
