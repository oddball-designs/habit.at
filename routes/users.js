'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var tasks = require('./tasks');

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

  // router.put('/tasks/:id', function(req,res){
  //   // this is the houshold id
  //   var id = Number(req.householdId);
  //   // this is the user id
  //   var userId = Number(req.userId);
  //   // this is the tasks id
  //   var taskId = req.params;
  //
  //
  // });


  // router.delete('/tasks/:id', function(req, res, next){
  //     knex('tasks')
  //     .where({id:req.params.id})
  //     .delete()
  //     .then(function(data){
  //         res.redirect('/user/'+req.params.user_name);
  //     })
  //     .catch(next);
  //
  //   });




module.exports = router;
