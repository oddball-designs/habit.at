'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');


// route for adding households
router.post('/', function(req, res, next){
  bcrypt.hash(req.body.household_password, Number(process.env.SALT) || 5, function(err, hash){
    if (err){
      console.log(err);
    }
    else {
      var householdObj = {
        name: req.body.household_name,
        email: req.body.household_email,
        password:hash
      };
      knex('households').insert(householdObj)
      .then(function(data){
        res.redirect('/');
      });
    }
  });
});


module.exports = router;
