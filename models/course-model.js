const db = require("../database/database");
const express = require("express");
const mongodb = require("mongodb");
const req = require("express/lib/request");

class Course {
  constructor(title, courseListData, uid) {
    this.title = title;
    this.list = courseListData;
    this.uid = uid;
  }

  // static async findById(productId) {
  //   let prodId;
  //   try {
  //     prodId = new mongodb.ObjectId(productId);
  //   } catch (error) {
  //     error.code = 404;
  //     throw error;
  //   }

  //   const product = await db
  //     .getDB()
  //     .collection("products")
  //     .findOne({ _id: prodId });
  //   if (!product) {
  //     const error = new Error("Could not find product..");
  //     error.code = 404;
  //     throw error;
  //   }
  //   return new Product(product);
  // }

  static async findAll(userId) {
    const allCourse = await db
      .getDb()
      .collection("courses")
      .find({ user_id: userId })
      .toArray();
    //create a new instance for each course
    return allCourse.map((courseDoc) => {
      // console.log(courseDoc);
      return new Course(courseDoc.title, courseDoc.list);
    });
  }

  async save() {
    // console.log("HERE IN COURSE MODEL SAVE");
    // console.log(this.list);
    const addCourse = {
      title: this.title,
      list: JSON.parse(this.list),
      user_id: this.uid,
    };
    await db.getDb().collection("courses").insertOne(addCourse);
    // console.log("COURSE SAVED");
  }

  async checkData() {
    // console.log("HERE DATA");
    // console.log(this.list);
  }
  async delete() {
    const prodId = new mongodb.ObjectId(this.id);
    await db.getDB().collection("products").deleteOne({ _id: prodId });
  }
}

module.exports = Course;
