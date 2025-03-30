// cash the registration, login and error display to use for logic
const registerForm = document.getElementById("registration");
const logForm = document.getElementById("login");
const showErr = document.getElementById("errorDisplay");

// create helper functions to displaying errors, success and clear data

// display Error helper
function displayErr(errMsg, inputEl) {
  showErr.textContent = errMsg;
  showErr.style.color = "red";
  showErr.style.display = "block";
  inputEl.focus();
}

// display success helper
function displaySuccess(successMsg) {
  showErr.textContent = successMsg;
  showErr.style.color = "green";
  showErr.style.display = "block";
}

// Clearing inputs field helper
function clearInputsField(form) {
  form.reset();
  showErr.textContent = "";
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
  const users = JSON.parse(localStorage.getItem("users") || "[]");
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
  if (!emailRegex.test(email)) {
    return "Enter valid Email!";
  }
  if (email.toLowerCase().endsWith("example.com")) {
    return "Enter valid email address!";
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
    return "Choice  better password!";
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
  e.preventDefault();

  let username = registerForm.username.value;
  let email = registerForm.email.value;
  let password = registerForm.password.value;
  let repeatPassword = registerForm.passwordCheck.value;
  let termOfCondition = registerForm.terms.value;

  // create error vars for each validation.
  const usernameErr = userNameValidation(username);
  const emailErr = emailValidation(email);
  const passwordErr = passwordValidation(password, username);
  const termsErr = !termOfCondition && "Must accept the terms and conditions";
  const repeatPasswordErr =
    password !== repeatPassword && "Passwords must match!";

  // i convert if and else statement. to accomplish this part, i got hing from stack overflow, specially the (!!) operator
  if (usernameErr || emailErr || passwordErr || termsErr || repeatPasswordErr) {
    switch (true) {
      case !!usernameErr:
        displayErr(usernameErr, registerForm.username);
        break;
      case !!emailErr:
        displayErr(emailErr, registerForm.email);
        break;
      case !!passwordErr:
        displayErr(passwordErr, registerForm.password);
        break;
      case !!termsErr:
        displayErr(termsErr, registerForm.terms);
        break;
      case !!repeatPasswordErr:
        displayErr(repeatPasswordErr, registerForm.passwordCheck);
        break;
    }
    return;
  }

  // local storage
  // check and set the data to local storage.
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: password,
  });
  localStorage.setItem("users", JSON.stringify(users));

  // clear the form and show success MSG to user
  clearInputsField(registerForm);
  displaySuccess("Your registration was Successful!");
});

///////////////////////////
///// login form--------->

// assign event listener to login form
// first prevent Default
// make sure assign the input values to variables
// check if user enter username and the password
// check if there is no match in local storage or incorrect password display error msg
// if there is match in local storage display success msg

logForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = logForm.username.value;
  let password = logForm.password.value;
  let persist = logForm.persist.checked;

  if (!username) {
    displayErr("Enter the username!", logForm.user);
    return;
  }

  if (!password) {
    displayErr("Enter the correct password!", logForm.password);
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  let getUser;

  for (let matchUser of users) {
    if (
      matchUser.username === username.toLowerCase() &&
      matchUser.password === password
    ) {
      getUser = matchUser;
      break;
    }
  }

  if (!getUser) {
    displayErr("User or Password NOT MATCH!", logForm.username);
    return;
  }

  clearInputsField(logForm);
  displaySuccess(
    `You Successfully Logged In! ${
      persist ? "Keep me logged in is checked" : ""
    }, `
  );
});
