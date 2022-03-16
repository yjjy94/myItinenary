const express = require("express");
// const res = require("express/lib/response");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.get("/user/newcourse", userController.getUserNewCourseView);

router.get("/user/home", userController.getUserHomeView);

router.post("/user/newcourse", userController.createNewCourse);

module.exports = router;
