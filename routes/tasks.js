'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  console.log(req.customParams);
  var id = Number(req.customParams.id);
  console.log(id);
  knex.select('users.first_name').from('users').innerJoin('households', 'users.household_id', 'households.id').where('households.id', id)
  .then(function(data){
    console.log(data);
    res.render('tasks', {users: data});
  });

});

module.exports = router;
