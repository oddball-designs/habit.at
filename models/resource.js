'use strict';

var Checkit = require('checkit');
var rules = Checkit({
  first_name: [
    { rule: 'required',
      message: 'We wouldn\'t want you to sign up without a name!'
    },
    { rule: 'alpha',
    message: 'your name can only have alphabet characters'
  }],
  last_name: [{
    rule: 'required',
    message: 'We wouldn\'t want you to sign up without a name!'
  },{
    rule: 'alpha',
    message: 'your name can only have alphabet characters'
  }
  ],
  email: [
    { rule: 'required',
      message: 'We need your e-mail to send you up messages!'
    },
    { rule: 'email',
      message: 'please enter a valid e-mail'
  }],
  phone_number: {
    minLength: 10,
    message: 'Please enter a 10-digit phone number'
  }
  });


var checkUser = function(data){
  return rules.run(data)
};

module.exports = {
  checkUser: checkUser
}
