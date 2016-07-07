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
  username:
    { rule: 'required',
      message: 'It\'s nice to have a username! It\'s also required!'
    },
  user_email: [
    { rule: 'required',
      message: 'We definitely need your email address'
    },
    { rule: 'email',
    message: 'you must enter something that at least looks like an email!'
  }],
  user_password:
    { rule: 'required',
      message: 'Passwords are required! Otherwise how will we know if you are who you say you are!'
    }
  });


var newHouseRules = new Checkit({
  new_household_name:
    { rule: 'required',
      message: 'Make sure to give your household a name! Make it one that describes your home'
    },
  new_household_email: [
    { rule: 'required',
      message: 'You need an e-mail address associated with your household'
    },
    { rule: 'email',
    message: 'you must enter something that at least looks like an email!'
  }],
  new_household_password:
    { rule: 'required',
      message: 'Passwords are required! Otherwise how will we know if you are you!'
    }
  });



var checkSignup = function(data){
  return rules.run(data);
};

var checkNewHouse = function(data){
  return newHouseRules.run(data);
};


module.exports = {
  checkSignup: checkSignup,
  newHouseRules: newHouseRules
};


// tel1: [
//   { rule: 'required',
//     message: 'Oops, looks like you might be missing the area code!'
//   },
//   { rule: 'minLength:3',
//   message: 'Please enter a 3-digit area code'
//   },
//   { rule: 'maxLength:3',
// message: 'You can only enter 3 area code digits'
//   }],
// tel2: [
//   { rule: 'required',
//     message: 'Oops, looks like you might be missing three digits of your phone number!'
//   },
//   { rule: 'minLength:3',
//   message: 'Looks like your phone number might be missing some numbers!'
//   },
//   { rule: 'maxLength:3',
//   message: 'Looks like you put too many numbers in your phone number!'
//   }],
// tel3: [
//   { rule: 'required',
//     message: 'Oops, looks like you might be missing the last four digits of your phone number!'
//   },
//   { rule: 'minLength:4',
//   message: 'Looks like your phone number might be missing some numbers!'
//   },
//   { rule: 'maxLength:4',
//   message: 'You can only have four digits in the last part of your phone number!'
// }]
