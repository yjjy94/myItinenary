function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  console.log("CHECK AUTH SESSION");
  next();
}

module.exports = checkAuthStatus;
