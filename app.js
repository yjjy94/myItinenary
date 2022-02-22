const path = require("path");
const express = require("express");
const db = require("./database/database");
const basicRoutes = require("./routes/basic-routes");
const userRoutes = require("./routes/user-routes");
const app = express();
//FOR EJS
app.set("view engine", "ejs"); //set to use ejs engine for rendering views
app.set("views", path.join(__dirname, "views")); // where to find the views .join used for all OS
//
//BASIC SETTINGS
app.use(express.static("public")); //need to set public files or css wont work
app.use(express.urlencoded({ extended: false })); // for extracting HTML form POST
app.use(basicRoutes);
app.use(userRoutes);
db.connectDb()
  .then(function () {
    app.listen(8888);
    console.log("DB CONNECTED");
  })
  .catch(function (error) {
    console.log(error);
  });
