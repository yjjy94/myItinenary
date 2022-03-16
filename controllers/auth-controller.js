const User = require("../models/users-model");
const authUtil = require("../util/authentication");

// function getSignUpView(req, res) {
//   res.render("user/signup");
// }

async function signUp(req, res, next) {
  const data = req.body;
  const user = new User(data.email, data.password);
  try {
    const existingUser = await user.checkEmail();
    if (existingUser) {
      console.log("User name already in use");
      res.redirect("/");
      return;
    }

    await user.newSignUp();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.redirect("/");
}

// function getLogInView(req, res) {
//   res.render("user/login");
// }

async function logIn(req, res, next) {
  // console.log("LOGIN IS " + res.locals.csrfToken);
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.checkEmail();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  if (!existingUser) {
    console.log("Cant find user");
    return next(error);
  }
  //no need for try catch here cuz checkPW is not connecting to db so most likely wont fail
  const checkPassword = await user.checkPassword(existingUser.password);
  if (!checkPassword) {
    console.log("Wrong password");
    return next(error);
  }
  authUtil.createUserSession(req, existingUser, () => {
    console.log("HERE IN AUTH UTIL createUserSession");
  });
  res.redirect("user/home");
}

function logOut(req, res) {
  console.log("HERE IN LOG OUT");
  authUtil.destroyUserAuthSession(req, res);
  res.redirect("/");
}
module.exports = {
  // getSignUpView: getSignUpView,
  // getLogInView: getLogInView,
  signUp: signUp,
  logIn: logIn,
  logOut: logOut,
};
