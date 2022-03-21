// function isEmpty(value) {
//   return !value || value.trim() === "";
// }

function userCredentialsAreValid(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 6
  );
}

// function userDetailsAreValid(email, password, name, street, postal, city) {
//   return (
//     userCredentialsAreValid(email, password) &&
//     !isEmpty(name) &&
//     !isEmpty(street) &&
//     !isEmpty(postal) &&
//     !isEmpty(city)
//   );
// }

function passwordMatchConfirm(password, confirmPassword) {
  return password === confirmPassword;
}

module.exports = {
  // userDetailsAreValid: userDetailsAreValid,
  userCredentialsAreValid: userCredentialsAreValid,
  passwordMatchConfirm: passwordMatchConfirm,
};
