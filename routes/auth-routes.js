const express = require("express");
const db = require("../database/database");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.get("/signup", (req, res) => {
  return res.render("user/signup");
});

router.post("/signup", (req, res, next) => {
  const data = req.body;
  console.log(data);
  const result = db
    .getDb()
    .collection("users")
    .insertOne({ email: data.email, password: data.password });
  res.redirect("/login");
});

module.exports = router;
