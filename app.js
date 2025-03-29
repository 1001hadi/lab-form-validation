// cash the registration, login and error display to use for logic
const registerForm = document.getElementById("registration");
const logForm = document.getElementById("login");
const showErr = document.getElementById("errorDisplay");

// create helper functions to displaying errors, success and clear data

// display Error helper
function displayErr(errMsg, inputEl) {
  showErr.textContent = errMsg;
  showErr.style.color = "red";
  inputEl.focus();
}

// display success helper
function displaySuccess(successMsg) {
  showErr.textContent = successMsg;
  showErr.style.color = "green";
}

// Clearing inputs field helper
function clearInputsField(form) {
  form.reset();
  showErr.style.color = "red";
  showErr.style.display = "none";
}

// username validating helper
// check the local storage if username is already in use
// same of the methods comes from stack Overflow and same researches
function userNameValidation(username) {
  if (!username) {
    return "Enter username!";
  }
  if (username.length < 4) {
    return "Username must be 4 or more character!";
  }

  if (new Set(username).size < 2) {
    return "Username cannot have special characters or space!";
  }
  if (/[^a-zA-Z0-9]/.test(username)) {
    return "Username can not have a special characters";
  }

  //check the local storage for existed username.
  const users = JSON.parse(localStorage.getItem("users") || []);
  let existUsername = false;
  for (let user of users) {
    if (user.username === username.toLowerCase()) {
      existUsername = true;
      break;
    }
  }
  if (existUsername) {
    return "Username you choice already existed!";
  }

  return;
}

// email validating helper
function emailValidation(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Enter you email! ";
  }
  if (email.toLowerCase().endWith("example.com")) {
    return "Enter valid email address!";
  }
  if (!emailRegex.test(email)) {
    return "Enter valid Email!";
  }

  return;
}

// password validating helper
function passwordValidation(password, username) {
  if (!password) {
    return "Enter the correct password";
  }
  if (password.length < 12) {
    return "password must be 12 characters long!";
  }
  if (!/[a-z]/.test(password) || !/[A_Z]/.test(password)) {
    return "You must include 1 Uppercase and at least 1 lowerCase character!";
  }
  if (!/[\d]/.test(password)) {
    return "you must include 1 number";
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Must include 1 special character";
  }
  if (password.toLowerCase().includes("password")) {
    return "Choice better password!";
  }
  if (password.includes(username)) {
    return "Password can't match the username!";
  }
  return;
}

// add eventListener to the registration and start validating
// get the username, email, password and term of condition values in the variables
// create error handling variable and set all function to it and check the errors
// start with user validation
// then email validation
// then password validation
// term of condition validation
// make sure store the data in local storage after validating them

registerForm.addEventListener("submit", (e) => {
  let username = registerForm.username.value;
  let email = registerForm.email.value;
  let password = registerForm.password.value;
  let repeatPassword = registerForm.passwordCheck.value;
  let termOfCondition = registerForm.terms.value;

  console.log(username);

  let handleErr =
    userNameValidation(username) ||
    emailValidation(email) ||
    passwordValidation(password) ||
    (terms && "Must accept the Term of conditions") ||
    (password !== repeatPassword && "Password must match!");

    // check the entered data and display errors if needed
  
});
