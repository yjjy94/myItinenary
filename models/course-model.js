const db = require("../database/database");
const express = require("express");
const mongodb = require("mongodb");
const req = require("express/lib/request");

class Course {
  constructor(courseData, sessionUid, updateCourseID) {
    this.title = courseData.title;
    this.list = courseData.list;
    this.uid = sessionUid;
    this.updateCourseID = updateCourseID;
  }

  static async findById(courseId) {
    let objectCourseId;
    try {
      objectCourseId = new mongodb.ObjectId(courseId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const resultCourse = await db
      .getDb()
      .collection("courses")
      .findOne({ _id: objectCourseId });
    if (!resultCourse) {
      const error = new Error("Could not find product..");
      error.code = 404;
      throw error;
    }

    return new Course(resultCourse);
  }

  static async findAll(userId) {
    const allCourse = await db
      .getDb()
      .collection("courses")
      .find({ user_id: userId })
      .toArray();

    return allCourse;
  }

  static async deleteById(paramId) {
    const courseId = new mongodb.ObjectId(paramId);
    await db.getDb().collection("courses").deleteOne({ _id: courseId });
  }

  static async deleteById(paramId) {
    const courseId = new mongodb.ObjectId(paramId);
    await db.getDb().collection("courses").deleteOne({ _id: courseId });
  }

  async save() {
    const addCourse = {
      title: this.title,
      list: JSON.parse(this.list),
      user_id: this.uid,
    };
    await db.getDb().collection("courses").insertOne(addCourse);
  }

  async updateById(productId) {
    const addCourse = {
      title: this.title,
      list: JSON.parse(this.list),
      user_id: this.uid,
    };
    let updateId = new mongodb.ObjectId(this.updateCourseID);
    await db.getDb().collection("courses").updateOne(
      { _id: updateId },
      {
        $set: addCourse,
      }
    );
  }
}

module.exports = Course;
