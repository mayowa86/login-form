// variables for login and createAccount:
const LoginForm = document.querySelector("#login");
const CreateAccount = document.querySelector("#createAccount");
const createAccountLink = document.querySelector("#linkCreateAccount");
const LoginLink = document.querySelector("#linkLogin");

// FUNCTION:::::login form element input check
function showFormSubmitMessage(FormElement, type, message) {
  const MessageDisplay = FormElement.querySelector(".form_message");
  MessageDisplay.textContent = message;
  MessageDisplay.classList.remove(
    ".form_message-success",
    ".form_message-error"
  );
  MessageDisplay.classList.add(`form_message-${type}`);
} // showFormMessage(LonginForm, "success", "You are logged in!");

// FUNCTION:::::inputs element error function declaration: Shows error whenever user type wrong input type....e.g type password instead of text
function showInputDataError(inputElement, message) {
  inputElement.classList.add(".form_input-error");
  inputElement.parentElement.querySelector(
    ".form_input-error-message"
  ).textContent = message;
}

// FUNCTION:::::clear inputs element error function declaration: Remove the input error when user now type in correct input type
function clearInputError(inputElement) {
  inputElement.classList.remove(".form_input-error");
  inputElement.parentElement.querySelector(
    ".form_input-error-message"
  ).textContent = "";
}

// FUNCTION:::::Main form function: inside the here we make use / call the functions we declared above for the actual events to take place!
document.addEventListener("DOMContentLoaded", () => {
  createAccountLink.addEventListener("click", (e) => {
    e.preventDefault();
    // toggle to show createAccount form and hid login
    LoginForm.classList.add("form-hidden");
    CreateAccount.classList.remove("form-hidden");
  });
  LoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    // toggle to show login and hid createAccount form
    LoginForm.classList.remove("form-hidden");
    CreateAccount.classList.add("form-hidden");
  });

  // input form element function call/usage
  document.querySelectorAll(".form_input").forEach((inputElement) => {
    inputElement.addEventListener("blur", (e) => {
      if (
        (e.target.id =
          "signUpUsername" &&
          e.target.value.length > 0 &&
          e.target.value.length < 8)
      ) {
        showInputDataError(
          inputElement,
          "Check input field, enter valid field requirements"
        );
      }
    });

    inputElement.addEventListener("input", (e) => {
      clearInputError(inputElement);
    });
  });
  //
});

// =======================
// variables for the create account user input && login user input
const usernameInput = CreateAccount["username"];
const emailInput = CreateAccount["email"];
const passwordInput = CreateAccount["password"];
const passwordCheckInput = CreateAccount["passwordCheck"];

// users array and addUser user.push()

let users = JSON.parse(localStorage.getItem("users")) || [];

// FUNCTION::::: addUser function stored in a variable to accept the input fields params then push the fields input data to the Users array
const addUser = (username, email, password, passwordCheck) => {
  users.push({
    username,
    email,
    password,
    passwordCheck,
  });

  // set user details that is already in the users array to local storage

  localStorage.setItem("users", JSON.stringify(users));

  return { username, email, password, passwordCheck };
};

// FUNCTION::::::: Collect values from the input fields of the form to the addUser variable
CreateAccount.onsubmit = (e) => {
  e.preventDefault();
  addUser(
    usernameInput.value,
    emailInput.value,
    passwordInput.value,
    passwordCheckInput.value
  );

  usernameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  passwordCheckInput.value = "";
};

// loop through the userLoginDatabase and check if the userName and Password matches any account. return true or false.

let usersFromLocalStorage = JSON.parse(localStorage.getItem("users")); 
console.log("userfromlocalstorage:", usersFromLocalStorage); // log the database from localStorage

const isUserValid = (userEmail = "", password = "") => {
  for (i = 0; i < usersFromLocalStorage.length; i++) {
    // checking if the user details is in the database
    if (
      userEmail.toLowerCase() ===
        usersFromLocalStorage[i].email.toLowerCase() &&
      password.toLowerCase() === usersFromLocalStorage[i].password.toLowerCase()
    ) {
      return true; // if the user is found return true.
    }
    return false; // this return needed to be outside the if statement otherwise we will get false after every check.
  }
};

// collect the user details and check using the isUserValid function to verify
LoginForm.onsubmit = (e) => {
  //  check if the user has an account in the database stored in localStorage
  if (
    isUserValid(LoginForm["loginEmail"].value, LoginForm["loginPassword"].value)
  ) {
    console.log(`Welcome! ${usersFromLocalStorage[i].username}.`) &&
      window.location.href("/dashboard.html"); //   if the user is found, perform an action.
  } else {
    showFormSubmitMessage(
      LoginForm,
      "error",
      "Invalid Username/password combination"
    );
  }
};
