'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var request = require('request');
var moment = require('moment');
var client = require('twilio')(process.env.SID, process.env.AUTH);

router.get('/', function(req, res, next) {
  if (req.session.id === undefined) {
    res.render('index');
  } else if (req.session.is_admin === true) {
    res.redirect('/households/' + req.session.household_id);
  } else {
    res.redirect('/households/' + req.session.household_id + '/users/' + req.session.id);
  }
});

router.get('/new', function(req, res, next){
  res.render('new_account', {error: false, emailTaken: false, emailHouseTaken: false});
});

router.post('/', function(req, res, next){
  knex('users').where({email: req.body.email}).then(function(data){
    bcrypt.compare(req.body.password, data[0].password, function(err, result){

      if(err){
        console.log(err);
      }
      //next(err);
      else {
        if(result){
          req.session.id = data[0].id;
          req.session.first_name = data[0].first_name;
          req.session.is_admin = data[0].is_admin;
          req.session.household_id = data[0].household_id;
          console.log(req.session);
          res.redirect('/');
        }
        else{
          res.send("Your email or password was invalid.");
        }
      }
    });
  });
});

router.get('/logout', function(req, res, next){
  req.sessionOptions.maxAge = 0;
  req.session = null;
  res.redirect('/');
});

// runs on chron job on heroku 
router.get('/trigger', function(req, res, next){
  knex.select('users.first_name', 'users.phone_number', 'tasks.title', 'tasks.description', 'due_date').from('tasks').leftJoin('users', 'tasks.user_id', 'users.id').where('due_date', new Date().toISOString().slice(0,10))
  .then(function(data){
    console.log(data);
    var messages =[];
    for(var i = 0; i < data.length; i++){
      messages.push(sendMessage(data[i].phone_number, data[i].title));
    }

    Promise.all(messages).then(function(results){
      console.log(results);
    })
    .catch(function(err){
      console.log(err);
    });
  });
});

module.exports = router;

function sendMessage(ph,title){
  return new Promise(function(resolve, reject){
    client.sendMessage({
    to: '+1' + ph, // Any number Twilio can deliver to
    from: '+19705333115', // A number you bought from Twilio and can use for outbound communication
    body: 'your task to ' + title + ' is due today. Log on to habit.at to see more details about your tasks for the day' // body of the SMS message
    }, function(err, responseData) {
    if (!err) {
        resolve();
      } else {
        console.log(err);
        reject();
      }
    });
  });
}
