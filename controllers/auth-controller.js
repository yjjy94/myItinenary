const User = require("../models/users-model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");

async function signUp(req, res, next) {
  const data = req.body;

  if (!validation.userCredentialsAreValid(data.email, data.password)) {
    res.locals.errorMsg =
      "Can't Sign Up! Check your Credentials! Enter a valid email and Password needs to be 6 characters minimum";
    return res.render("home");
  }

  if (
    !validation.passwordMatchConfirm(data.password, data["confirm-password"])
  ) {
    res.locals.errorMsg =
      "Can't Sign Up! Check your Credentials! Password don't match!";
    return res.render("home");
  }
  try {
    const user = new User(data.email, data.password);
    const existingUser = await user.checkEmail();
    if (existingUser) {
      res.locals.errorMsg = "User Exists! Try Logging In!";
      return res.render("home");
    }
    await user.newSignUp();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.redirect("/");
}

async function logIn(req, res, next) {
  const data = req.body;
  const user = new User(data.email, data.password);
  let existingUser;

  try {
    existingUser = await user.checkEmail();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  if (!existingUser) {
    res.locals.errorMsg = "Can't Log In! Check your Credentials!";
    return res.render("home");
  }
  //no need for try catch here cuz checkPW is not connecting to db so most likely wont fail
  const checkPassword = await user.checkPassword(existingUser.password);
  if (!checkPassword) {
    res.locals.errorMsg = "Can't Log In! Check your Credentials!";
    return res.render("home");
    // return next(error);
  }
  authUtil.createUserSession(req, existingUser, () => {});
  res.redirect("user/home");
}

function logOut(req, res) {
  authUtil.destroyUserAuthSession(req, res);
  res.redirect("/");
}
module.exports = {
  signUp: signUp,
  logIn: logIn,
  logOut: logOut,
};
