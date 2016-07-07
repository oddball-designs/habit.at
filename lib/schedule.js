'use strict';

var cron = require('node-cron');
var client = require('twilio')(process.env.SID, process.env.AUTH);
var knex = require('../db/knex');

// running a task ever 24 hours
function schedule(){
  console.log(Date());
  cron.schedule('0 9 * * *', function(){
    knex.select('users.first_name', 'users.phone_number', 'tasks.title', 'tasks.description', 'due_date').from('tasks').leftJoin('users', 'tasks.user_id', 'users.id').where('due_date', new Date().toISOString().slice(0,10)).andWhere('tasks.is_complete', 'false')
    .then(function(data){
      console.log('cron');
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
}


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

module.exports = schedule;
