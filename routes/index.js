'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  if (req.session.id === undefined) {
    res.render('index');
  } else if (req.session.is_admin === true) {
    res.redirect('/households/' + req.session.household_id);
  } else {
    res.redirect('/households/' + req.session.household_id + '/users/' + req.session.id);
  }
});

router.get('/new', function(req, res, next){
  res.render('new_account', {error: false});
});

router.post('/', function(req, res, next){
  knex('users').where({email: req.body.email}).then(function(data){
    bcrypt.compare(req.body.password, data[0].password, function(err, result){

      if(err){
        console.log(err);
      }
      //next(err);
      else {
        if(result){
          req.session.id = data[0].id;
          req.session.first_name = data[0].first_name;
          req.session.is_admin = data[0].is_admin;
          req.session.household_id = data[0].household_id;
          res.redirect('/');
        }
        else{
          res.send("Your email or password was invalid.");
        }
      }
    });
  });
});

router.get('/logout', function(req, res, next){
  req.sessionOptions.maxAge = 0;
  req.session = null;
  res.redirect('/');
});

module.exports = router;
