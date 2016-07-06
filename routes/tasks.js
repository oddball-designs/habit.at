'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res){
  var id = Number(req.customParams.id);
  knex('households').innerJoin('users', 'users.household_id', 'households.id')
  .innerJoin('tasks', 'tasks.user_id', 'users.id').where('households.id', id)
  .then(function(data){
    res.render('household_tasks', {households: data});
  });

});



router.get('/new', function(req, res) {
  var id = Number(req.customParams.id);
  knex.select('users.id','users.first_name').from('users').innerJoin('households', 'users.household_id', 'households.id').where('households.id', id)
  .then(function(data){
    res.render('new_task', {users: data});
  });
});

router.post('/new', function(req, res){
  var isWeekly = false;
  if (req.body.is_weekly){
    isWeekly = true;
  }
  knex.select('users.id', 'users.household_id').from('users').where('users.id', req.body.user)
  .then(function(data){
    var taskObj = {
      title: req.body.title,
      description: req.body.description,
      user_id: data[0].id,
      is_weekly: isWeekly,
      is_complete: false,
      creation_date: 'now',
      completion_date: null,
      due_date: req.body.date_due
    };
    return knex('tasks').insert(taskObj).then(function(d){
      res.redirect('/households/' + data[0].household_id + '/tasks');
    });
  });

});

module.exports = router;
