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
// add data to local storage
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

  return null;
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

  return null;
}

// password validating helper

// add eventListener to the registration and start validating
// get the username, email, password and term of condition values in the variables
// start with user validation
// then email validation
// then password validation
// term of condition validation
// make sure store the data in local storage after validating them
