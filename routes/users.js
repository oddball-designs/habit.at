'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

  // route for adding users
  router.post('/', function(req, res, next){
    bcrypt.hash(req.body.user_password, Number(process.env.SALT) || 5, function(err, hash){
      if (err){
        console.log(err);
      }
      else {
        var userObj = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          phone_number: req.body.phone_number,
          email: req.body.user_email,
          password: hash,
          household_id: req.body.household_id
        }
      knex('users').insert(userObj)
      .then(function(data){
        res.redirect('/');
      });
      }
    });
  });
module.exports = router;
