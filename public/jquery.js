'use strict';

$(document).ready(function() {
  console.log('hello j');
    $('#button-login').click(function(){
      console.log('hello jquery');
      $('.fade-container').fadeOut('slow', function(){
        $('#login').fadeIn('slow');
      });

    });
});
