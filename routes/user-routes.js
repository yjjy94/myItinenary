const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

router.get("/mycourse", (req, res) => {
  res.render("user/myCourse");
});

router.get("/newcourse", (req, res) => {
  res.render("user/newcourse");
});

router.get("/user/home", (req, res) => {
  res.render("user/userHome");
});
module.exports = router;
