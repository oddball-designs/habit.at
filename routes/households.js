'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var users = require('./users');
var tasks = require('./tasks');
var resource = require('../models/resource');

router.use('/', function(req, res, next) {
  if((req.method === 'POST' && req.url === '/') || req.session.id !== undefined) {
    next();
  } else {
    res.redirect('/');
  }
});

router.use('/:id/users', function(req, res, next){
  req.customParams = req.params;
  next();
});

router.use('/:id/users', users);

// households/id/users/id
router.use('/:id/users/:user_id', function(req, res, next){
  req.householdId = req.params.id;
  req.userId = req.params.user_id;
  next();
});

router.use('/:id/users/:user_id', users);

router.use('/:id/users/:user_id/tasks/:task_id', function(req, res, next){
  req.householdId = req.params.id;
  req.userId = req.params.user_id;
  req.taskId = req.params.task_id;
  next();
});

router.use('/:id/users/:user_id/tasks/:task_id', tasks);

router.use('/:id/tasks', function(req, res, next){
  req.customParams = req.params;
  next();
});

router.use('/:id/tasks', tasks);

//renders household template
router.get('/:id', function(req, res) {
  var admins = [];
  var members = [];
  knex.select('users.id', 'users.first_name', 'users.last_name', 'users.household_id', 'users.is_admin', 'households.name')
  .from('users')
  .leftJoin('households','users.household_id','households.id')
  .where({household_id: req.params.id}).orderBy('first_name','asc').then(function(data) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].is_admin === true) {
        admins.push(data[i]);
      } else {
        members.push(data[i]);
      }
    }
    res.render('household', {admins:admins, members:members});
  });
});

// route for adding households and users

router.post('/', function(req, res, next){
  knex('users').where({email: req.body.user_email}).then(function(data){
    if(data.length > 0){
      res.render('new_account', {emailTaken: true, error: false});
    }
    else {
  resource.checkSignup(req.body).then(function(validated){
      if (req.body.user_option === 'join') {
          knex('households').where({email: req.body.household_email}).then(function(data){
            bcrypt.compare(req.body.household_password, data[0].password, function(err, result){
              if (result){
                bcrypt.hash(req.body.user_password, Number(process.env.SALT) || 5, function(err, hash){
                  var userObj = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    phone_number: req.body.tel1 + req.body.tel2 + req.body.tel3,
                    email: req.body.user_email,
                    password: hash,
                    is_admin: false,
                    household_id: data[0].id
                  };
                  return knex('users').returning('household_id').insert(userObj).then(function(id){
                    res.redirect('/');
                  });
                });
              }
            });
          });
      }
      // if the household does not exist
      else if (req.body.user_option === 'create'){

        knex('households').where({email: req.body.new_household_email}).then(function(data){
          if(data.length > 0){
            res.render('new_account', {emailHouseTaken: true, emailTaken: false, error: false});
          }
          else {
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
                  phone_number: req.body.tel1 + req.body.tel2 + req.body.tel3,
                  email: req.body.user_email,
                  password: hash,
                  is_admin: true,
                  household_id: data[0]
                };
                return knex('users').returning('household_id').insert(userObj).then(function(id){
                  res.redirect('/');
              });
            });
          });
          }
        });
      }
    });
  }
    }).catch(function(err){
          res.render('new_account', {error:err});
      });
    }
  });
});







module.exports = router;
