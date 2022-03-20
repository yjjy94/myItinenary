const Course = require("../models/course-model");
const express = require("express");

async function createNewCourse(req, res, next) {
  const course = new Course(req.body, req.session.uid);
  try {
    await course.save();
  } catch (error) {
    return next(error);
  }
  res.redirect("/user/home");
}

async function getUserHomeView(req, res, next) {
  if (checkAuth(res)) {
    try {
      const allCourses = await Course.findAll(res.locals.uid);

      // console.log(res.locals.uid);
      res.render("user/userHome", { allCourses: allCourses });
    } catch (error) {
      return next(error);
    }
  } else {
    res.redirect("/");
  }
}

function getUserNewCourseView(req, res, next) {
  if (checkAuth(res)) {
    res.render("user/newCourse");
  } else {
    res.redirect("/");
  }
}

function checkAuth(res) {
  let result = res.locals.isAuth ? true : false;
  return result;
}

module.exports = {
  createNewCourse: createNewCourse,
  getUserHomeView: getUserHomeView,
  getUserNewCourseView: getUserNewCourseView,
};
