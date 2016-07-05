'use strict';

var userChoice = document.querySelector('#select');
var createHousehold = document.querySelector('#create_household');
var oldHousehold = document.querySelector('#old_household');
oldHousehold.style.display = 'none';

userChoice.addEventListener('change', function(ev){
  if (userChoice.value === 'join'){
    oldHousehold.style.display = 'block';
    createHousehold.style.display = 'none';
  }
  if (userChoice.value === 'create'){
      createHousehold.style.display = 'block';
      oldHousehold.style.display = 'none';
    }
});
