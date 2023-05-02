$(document).ready(function() {  
    $('.card-body').hide(); 
    $('.btn-link').click(function() { 
      var cardBody = $(this).closest('.card').find('.card-body');
      $('.card-body').not(cardBody).slideUp();
      
      if (cardBody.is(':visible')) {
        cardBody.slideUp();
      }        
      else {
        $('.card-body').slideUp();
        cardBody.slideDown();
      }
    });
  }); 
const buttons = document.querySelectorAll('button');        
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault(); 
    console.log(); 
  });
});