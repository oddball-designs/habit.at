'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/tasks', function(req, res, next) {
  res.render('tasks');
});

module.exports = router;
