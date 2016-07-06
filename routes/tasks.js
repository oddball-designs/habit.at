'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res){
  var id = Number(req.customParams.id);
  knex('households')
  .innerJoin('users', 'users.household_id', 'households.id')
  .innerJoin('tasks', 'tasks.user_id', 'users.id')
  .where('households.id', id)
  .then(function(data){
    console.log(data);
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
    console.log(users);
    res.render('household_tasks', {users: users, households:data} );
  });

});



router.get('/new', function(req, res) {
  console.log(req.customParams);
  var id = Number(req.customParams.id);
  console.log(id);
  knex.select('users.first_name').from('users').innerJoin('households', 'users.household_id', 'households.id').where('households.id', id)
  .then(function(data){
    console.log(data);
    res.render('new_task', {users: data});
  });
});

router.post('/new', function(req, res){
  console.log(req.body);
  console.log(req.body.user);
  var isWeekly = false;
  if (req.body.is_weekly){
    isWeekly = true;
  }
  knex.select('users.id', 'users.household_id').from('users').where('users.first_name', req.body.user)
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
