function getLogInForm() {
  let currentContainer = document.querySelector(".show");
  let divLogIn = document.getElementById("div-logIn");

  currentContainer.classList.replace("show", "hidden");
  divLogIn.classList.replace("hidden", "show");
}

function getSignUpForm() {
  let currentContainer = document.querySelector(".show");
  let divSignUp = document.getElementById("div-signUp");

  currentContainer.classList.replace("show", "hidden");
  divSignUp.classList.replace("hidden", "show");
}
