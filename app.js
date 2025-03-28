// cash the registration, login and error display to use for logic
const registerForm = document.getElementById("registration");
const logForm = document.getElementById("login");
const showErr = document.getElementById("errorDisplay");

// create helper functions to displaying errors, success and clear data

// display Error helper
function displayErr(errMsg) {
  showErr.textContent = errMsg;
  showErr.style.color = "red";
}

// display success helper
function displaySuccess(successMsg) {
  showErr.textContent = successMsg;
  showErr.style.color = "green";
}

// Clearing inputs field helper
// this part build with hint from stack Overflow;
function clearInputsField(form) {
  form
    .querySelectorAll(
      `input[type="text"], input[type="email"], input[type="password"]`
    )
    .forEach((input) => {
      input.value = "";
      //   onfocus = "this.value= ''";
    });

  form.querySelectorAll(`input[type="checkbox"]`).forEach((checkBox) => {
    checkBox.checked = false;
  });
}
