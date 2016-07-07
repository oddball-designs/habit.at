'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res){
  var id = Number(req.customParams.id);
  knex('households')
  .leftJoin('users', 'users.household_id', 'households.id')
  .leftJoin('tasks', 'tasks.user_id', 'users.id')
  .where('households.id', id)
  .then(function(data){
    var users = {};
    for (var i = 0; i < data.length; i++){
      if (users[data[i].user_id]){
        users[data[i].user_id].tasks.push({title: data[i].title, description: data[i].description, due_date: data[i].due_date});
      }
      else {
        users[data[i].user_id] = {
          name: data[i].first_name,
          tasks: []
        };
        users[data[i].user_id].tasks.push({
          title: data[i].title,
          description: data[i].description,
          due_date: data[i].due_date
        });
      }
    }
    res.render('household_tasks', {users: users, households:data} );
  });

});



router.get('/new', function(req, res) {
  var id = Number(req.customParams.id);
  knex.select('users.id','users.first_name').from('users').innerJoin('households', 'users.household_id', 'households.id').where('households.id', id)
  .then(function(data){
    res.render('new_task', {users: data});
  });
});

router.get('/edit', function(req, res){
  var householdId = Number(req.customParams.id);
  knex('users')
  .where('household_id',householdId)
  .then(function(data){
    return knex('tasks').where('id', req.taskId)
    .then(function(task){
      res.render('edit', {users: data, task: task[0]});
    });
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
      due_date: req.body.date_due,
      time_due: req.body.time_due
    };
    return knex('tasks').insert(taskObj).then(function(d){
      res.redirect('/households/' + data[0].household_id + '/tasks');
    });
  });

});

module.exports = router;
