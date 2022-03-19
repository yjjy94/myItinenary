const User = require("../models/users-model");
const authUtil = require("../util/authentication");

async function signUp(req, res, next) {
  const data = req.body;
  const user = new User(data.email, data.password);
  try {
    const existingUser = await user.checkEmail();
    if (existingUser) {
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

async function logIn(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.checkEmail();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  if (!existingUser) {
    return next(error);
  }
  //no need for try catch here cuz checkPW is not connecting to db so most likely wont fail
  const checkPassword = await user.checkPassword(existingUser.password);
  if (!checkPassword) {
    return next(error);
  }
  authUtil.createUserSession(req, existingUser, () => {});
  res.redirect("user/home");
}

function logOut(req, res) {
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
