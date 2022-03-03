const Course = require("../models/course-model");
const express = require("express");

async function createNewCourse(req, res, next) {
  console.log("Here in createnewcourse");
  checkAuth(res);
  const course = new Course(
    req.body.title,
    req.body.courseListData,
    req.session.uid
  );
  try {
    await course.save();
  } catch (error) {
    return next(error);
  }
  res.redirect("/user/home");
}

async function getAllUserCourse(req, res, next) {
  checkAuth(res);
  try {
    const allCourses = await Course.findAll(res.locals.uid);
    res.render("user/userHome", { allCourses: allCourses });
  } catch (error) {
    return next(error);
  }
}

function checkAuth(res) {
  if (res.locals.isAuth) {
    return true;
  } else {
    return res.redirect("/");
  }
}

module.exports = {
  createNewCourse: createNewCourse,
  getAllUserCourse: getAllUserCourse,
};
