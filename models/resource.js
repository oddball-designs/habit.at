'use strict';

var Checkit = require('checkit');
var rules = new Checkit({
  first_name: [
    { rule: 'required',
      message: 'We wouldn\'t want you to sign up without a name!'
    },
    { rule: 'alpha',
    message: 'your name can only have alphabet characters'
  }],
  last_name: [
    { rule: 'required',
      message: 'Your last name is important too!'
    },
    { rule: 'alpha',
    message: 'your name can only have alphabet characters'
  }],
  user_email: [
    { rule: 'required',
      message: 'We definitely need your email address'
    },
    { rule: 'email',
    message: 'you must enter something that at least looks like an email!'
  }],
  phone_number: [
    { rule: 'required',
      message: 'We definitely need your phone number'
    },
    { rule: 'minLength:10',
    message: 'We\'ll want to text you reminders, please enter a 10-digit number'
  }]
  });


var checkUser = function(data){
  return rules.run(data);
};

module.exports = {
  checkUser: checkUser
};
