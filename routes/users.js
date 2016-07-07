'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var tasks = require('./tasks');

// route for adding users

router.get('/:user_id', function(req, res) {
  if (Number(req.session.id) === Number(req.params.user_id) || req.session.is_admin === true) {
    knex('tasks')
    .where('user_id', req.params.user_id)
    .orderBy('tasks.id','asc')
    .then(function(data) {
      return knex.select('first_name').from('users').where('id',req.params.user_id).then(function(firstName) {
        res.render('user',{
          user:{id: req.session.id,
                household_id: req.session.household_id,
                is_admin: req.session.is_admin,
                first_name: firstName[0].first_name},
          tasks:data
        });
      });
    });
  } else {
    res.redirect('/households/' + req.session.household_id + '/users/' + req.session.id);
  }
});

router.put('/:user_id', function(req, res) {
  knex('users')
  .update('is_admin',true)
  .where('id',req.params.user_id)
  .then(function() {
    res.redirect('/households/' + req.session.household_id);
  });
});

router.delete('/:user_id', function(req, res) {
  knex('users')
  .del()
  .where('id',req.params.user_id)
  .then(function() {
    res.redirect('/households/' + req.session.household_id);
  });
});

router.get('/tasks/:id', function(req, res){
  res.render('edit', {tasks:{description: req.session.description}});
});



router.put('/tasks/:id', function(req, res){
  knex('tasks').where('id', req.params.id).update({
      title: req.body.title,
      description: req.body.description,
      user_id: req.body.user,
      is_weekly: req.body.is_weekly,
      due_date: req.body.date_due,
      time_due: req.body.time_due
    }).then(function(){
      res.redirect('/households/' + req.session.household_id + '/tasks');
    });
  });


router.put('/tasks/:id/toggle', function(req, res) {
  knex('tasks')
  .where('id',req.params.id)
  .then(function(task) {
    if (task[0].is_complete === true) {
      return knex('tasks').update({is_complete:false,completion_date:null}).where('id',req.params.id).then(function() {
        res.redirect('/households/' + req.session.household_id + '/users/' + req.session.id);
      });
    } else {
      return knex('tasks').update({is_complete:true,completion_date:'now'}).where('id',req.params.id).then(function() {
        res.redirect('/households/' + req.session.household_id + '/users/' + req.session.id);
      });
    }
  });
});


router.delete('/tasks/:id', function(req, res){
  knex('tasks')
  .del()
  .where('id',req.params.id)
  .then(function() {
    res.redirect('/households/' + req.session.household_id + '/users/' + req.session.id);
  });
});



module.exports = router;
