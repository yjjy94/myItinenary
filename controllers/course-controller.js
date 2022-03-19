const Course = require("../models/course-model");
const mongodb = require("mongodb");

function getViewCourseView(req, res, next) {
  if (checkAuth(res)) {
    res.render("user/viewCourse", {
      courseId: req.params.id,
    });
  } else {
    res.redirect("/");
  }
}

async function getUpdateCourseView(req, res, next) {
  if (checkAuth(res)) {
    try {
      let courseId = new mongodb.ObjectId(req.params.id);
      const course = await Course.findById(courseId);

      res.render("user/updateCourse", {
        courseList: course,
        courseId: req.params.id,
      });
    } catch (error) {
      res.redirect("/user/home");
    }
  } else {
    return res.redirect("/");
  }
}

async function getCourseDetailsClient(req, res, next) {
  try {
    let courseId = new mongodb.ObjectId(req.params.id);
    const course = await Course.findById(courseId);
    res.json(course);
  } catch (error) {
    error.code = 404;
    return next(error);
  }
}

async function deleteCourse(req, res, next) {
  if (checkAuth(res)) {
    let courseId;

    try {
      courseId = new mongodb.ObjectId(req.params.id);
      const course = await Course.deleteById(courseId);
      // res.redirect("/user/home");
      res.json({ message: "Course Deleted! Go back to Home!" });
    } catch (error) {
      error.code = 404;
      next(error);
    }
  } else {
    res.redirect("/");
  }
}

async function updateCourse(req, res, next) {
  const course = new Course(req.body, req.session.uid, req.params.id);
  try {
    await course.updateById();
  } catch (error) {
    return next(error);
  }
  res.redirect("/user/home");
}

function checkAuth(res) {
  let result = res.locals.isAuth ? true : false;
  return result;
}

module.exports = {
  getViewCourseView: getViewCourseView,
  getUpdateCourseView: getUpdateCourseView,
  getCourseDetailsClient: getCourseDetailsClient,
  deleteCourse: deleteCourse,
  updateCourse: updateCourse,
};
