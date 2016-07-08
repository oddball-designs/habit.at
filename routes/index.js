'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var request = require('request');
var moment = require('moment');
var resource = require('../models/resource');


router.get('/', function(req, res, next) {
  if (req.session.id === undefined) {
    res.render('index', {emailNotFound: false, error: false});
  } else if (req.session.is_admin === true) {
    res.redirect('/households/' + req.session.household_id);
  } else {
    res.redirect('/households/' + req.session.household_id + '/users/' + req.session.id);
  }
});

router.get('/new', function(req, res, next){
  res.render('new_account', {error: false, emailTaken: false, invalidEmail: false, emailHouseTaken: false});
});

router.post('/', function(req, res, next){
  var email = req.body.email;
  resource.checkLogIn(req.body).then(function(validated){
  knex('users').where({email: email.toLowerCase()}).then(function(data){
    if(data.length === 0){
      res.render('index', {emailNotFound: true, error: false, emailMatch: req.body});
    }
    bcrypt.compare(req.body.password, data[0].password, function(err, result){
      if(err){
        console.log(err);
      }
      else {
        if(result){
          req.session.id = data[0].id;
          req.session.first_name = data[0].first_name;
          req.session.is_admin = data[0].is_admin;
          req.session.household_id = data[0].household_id;
          console.log(req.session);
          res.redirect('/');
        }
        else{
          res.send("Your email or password was invalid.");
        }
      }
    });
  });
}).catch(function(err){
      res.render('index', {error: err, emailNotFound: false, emailMatch: req.body});
  });
});

router.get('/logout', function(req, res, next){
  req.sessionOptions.maxAge = 0;
  req.session = null;
  res.redirect('/');
});

// runs on chron job on heroku

module.exports = router;
