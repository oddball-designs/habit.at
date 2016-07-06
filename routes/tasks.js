'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res){
  res.send('you are at household tasks');
})

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
