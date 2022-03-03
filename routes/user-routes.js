const express = require("express");
const res = require("express/lib/response");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.get("/user/mycourse", (req, res) => {
  res.render("user/myCourse");
});

router.get("/user/newcourse", (req, res) => {
  res.render("user/newcourse");
});

router.get("/user/home", userController.getAllUserCourse);

router.post("/user/newcourse", userController.createNewCourse);

module.exports = router;
