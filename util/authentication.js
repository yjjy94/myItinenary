function createUserSession(req, user, action) {
  console.log("SESSION HERE HERHERHE");
  req.session.uid = user._id.toString(); //setting the user uid ONLY if login success
  req.session.save(action); // from express-session, will save the session and THEN execute action
  // console.log(req.session.uid);
}

function destroyUserAuthSession(req, res) {
  req.session.uid = null; // to delete the session data when logged out
}
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
