//Initialize the form elements
const form = document.querySelector('.signup__form');
const submitBtn = document.querySelector('.submit');

//Initialize the input fields
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');

//Initialize the error counter
let errorCounter;

form.addEventListener('click', e => {
  //Set the counter to 0 every time the form is trying to be submitted
  errorCounter = 0;

  //If the submit button is pressed...
  if(e.target === submitBtn) {
    //Check if any of the fields are empty
    checkEmpty([firstName, lastName, email, password]);

    //If the email field is not empty, check if it is a valid address
    if(email.value.trim() !== '') {
      checkValid(email);
    }

    //If any errors were found that means errorCounter is above 0, prevent the form from submitting
    if(errorCounter > 0) {
      e.preventDefault();
    }
    //Otherwise go ahead
  }
})

function checkEmpty(fields) {
  //Go through all the input fields
  fields.forEach(item => {
    if(item.value.trim() === '') {
      //If any of the items are empty, show the error and increase the error counter
      showError(item, `${item.name} cannot be empty`);
      errorCounter++;
    }
  });
}

function checkValid(input) {
  /*
  This mess of a regex code was found here
  https://emailregex.com/
  */

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  
  //If the email input doesn't match the emailRegex, show an error
  if(!emailRegex.test(input.value.trim())) {
    showError(input, 'Looks like this is not an email');
    errorCounter++;
  }
}

function showError(target, msg) {
  //Replace the error text with the specified message
  target.nextElementSibling.innerText = msg;
  //Add the error class to the parent element (.input-block in this case)
  target.parentElement.classList.add('error');
}