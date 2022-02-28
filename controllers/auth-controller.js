const User = require("../models/users-model");

function getSignUpView(req, res) {
  res.render("user/signup");
}

async function signUp(req, res, next) {
  const data = req.body;
  const user = new User(data.email, data.password);
  try {
    const existingUser = await user.checkEmail();
    if (existingUser) {
      console.log("User name already in use");
      res.redirect("user/signup");
      return;
    }

    await user.newSignUp();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.redirect("/login");
}

function getLogInView(req, res) {
  res.render("user/login");
}

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

  res.redirect("/user/home");
}

module.exports = {
  getSignUpView: getSignUpView,
  getLogInView: getLogInView,
  signUp: signUp,
  logIn: logIn,
};
