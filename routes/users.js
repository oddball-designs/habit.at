'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

  // route for adding users

router.get('/:user_id', function(req, res) {
  knex('tasks')
  .where('user_id', req.params.user_id)
  .orderBy('tasks.id','asc')
  .then(function(data) {
    return knex.select('first_name').from('users').where('id',req.params.user_id).then(function(firstName) {
      res.render('user',{
        user:{id: req.session.id,
              household_id: req.session.household_id,
              first_name: firstName[0].first_name},
        tasks:data
      });
    });
  });
});

router.get('/tasks/:id', function(req, res){
  // var id = Number(req.customParams.id);
  // knex.select('users.first_name').from('users').innerJoin('households', 'users.household_id', 'households.id').where('households.id', id)
  // .then(function(data){
  //   console.log(data);
  console.log(data[i].description);
  res.render('edit', {tasks:{description: req.session.description}});
});
//});

  // households/id/users/id/tasks/id

  router.put('/tasks/:id', function(req,res){
    // this is the houshold id
    var id = Number(req.householdId)
    // this is the user id
    var userId = Number(req.userId);
    // this is the tasks id
    var taskId = req.params;


  });



module.exports = router;
