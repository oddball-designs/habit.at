'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');


//renders household template
router.get('/:id', function(req, res) {
  knex('users').where({household_id: req.params.id}).then(function(data) {
    console.log(data);
  });
  res.render('household');
});

router.get('/:houshold_id/users/:user_id', function(req, res) {
  res.render('user');
});

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
