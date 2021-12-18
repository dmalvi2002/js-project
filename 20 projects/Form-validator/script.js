const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Functions
const showError = function (input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

const showSuccess = function (input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check email validation
const checkEmail = function (input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else showError(input, 'Email is not valid');
};
// Check form validation
const checkRequired = function (inputArr) {
  inputArr.forEach(input => {
    if (input.value === '') {
      showError(input, `${getInputName(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Checking input length
const checkLength = function (input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getInputName(input.id)} must be at least ${min} characters!`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputName(input.id)} must be less than ${max} characters!`
    );
  } else showSuccess(input);
};

// check password match
const checkPassMatch = function (input1, input2) {
  if (input1.value !== input2.value)
    showError(input2, "Password doesn't match");
};

// Maiking 1st letter uppercase
const getInputName = function (input) {
  const name = input.charAt(0).toUpperCase() + input.slice(1);
  return name;
};

// Event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassMatch(password, password2);
});
