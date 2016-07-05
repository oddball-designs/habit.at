'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');


// route for adding households and users
router.post('/', function(req, res, next){
  // adds household first
  if (req.body.user_option === 'join') {
      knex('households').where({email: req.body.household_email}).then(function(data){
        bcrypt.compare(req.body.household_password, data[0].password, function(err, result){
          console.log(result);
          if (result){
            bcrypt.hash(req.body.user_password, Number(process.env.SALT) || 5, function(err, hash){
              var userObj = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                phone_number: req.body.phone_number,
                email: req.body.user_email,
                password: hash,
                household_id: data[0].id
              };
              return knex('users').returning('household_id').insert(userObj).then(function(id){
                console.log(id[0]);
                res.redirect('/households/' + id[0]);
              });
            });
          }
        });
      });
  }
  else if (req.body.user_option === 'create'){
    bcrypt.hash(req.body.new_household_password, Number(process.env.SALT) || 8, function(err, hash){
      if (err){
        console.log(err);
      }
      else {
        var householdObj = {
          name: req.body.new_household_name,
          email: req.body.new_household_email,
          password:hash
        };
        knex('households').returning('id').insert(householdObj)
        .then(function(data){
          bcrypt.hash(req.body.user_password, Number(process.env.SALT) || 5, function(err, hash){
            var userObj = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              phone_number: req.body.phone_number,
              email: req.body.user_email,
              password: hash,
              household_id: data[0]
            };
            return knex('users').returning('household_id').insert(userObj).then(function(id){
              res.redirect('/households/' + id);
          });
        });
      });
      }
    });
  }
});





module.exports = router;
