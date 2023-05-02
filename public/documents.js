const pages = ['filling', 'filling-all', 'filling-cart', 'filling-car', 'filling-work'];  

        const checkboxes = document.querySelectorAll('.document input[type="checkbox"]');
        
        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener('change', function() {
            if(this.checked) {
              checkboxes.forEach((cb) => {
                if(cb !== this) {
                  cb.checked = false;
                }
              });
            }
          }); 
        });
        
        document.querySelector('.form-choose').addEventListener('submit', function(event) {
          event.preventDefault();
          const checkedCheckbox = document.querySelector('.document input[type="checkbox"]:checked');
          if (checkedCheckbox) {
            window.location.href = checkedCheckbox.value;
          } else {
            alert('Ви не вибрали жодного документа!');
          }
        });
        
        const form = document.querySelector('.form-choose');
        const chooseButton = document.querySelector('#choose-button'); 
        
        form.addEventListener('click', (event) => {
          event.preventDefault();  
        
          const checkedCheckbox = document.querySelector('.document input[type="checkbox"]:checked');
          if (!checkedCheckbox) {
            alert('Ви не вибрали жодного документа!');
            return;
          } 
          const checkedIndex = Array.prototype.indexOf.call(checkboxes, checkedCheckbox);  
        
          window.location.replace(`/${pages[checkedIndex]}`);  
        }); 