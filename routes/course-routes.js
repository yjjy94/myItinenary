const express = require("express");
const courseController = require("../controllers/course-controller");
const router = express.Router();

router.get("/user/viewcourse/:id", courseController.getViewCourseView);
router.get(
  "/user/viewcourse/:id/getDetails",
  courseController.getCourseDetailsClient
);

router.get("/user/:id/update", courseController.getUpdateCourseView);
router.post("/user/:id/update", courseController.updateCourse);

router.delete("/user/viewcourse/:id", courseController.deleteCourse);
module.exports = router;
