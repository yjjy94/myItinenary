const path = require("path");
const express = require("express");
const db = require("./database/database");
const expressSession = require("express-session");
const createSessionConfig = require("./config/session");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const csrf = require("csurf");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const basicRoutes = require("./routes/basic-routes");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const courseRoutes = require("./routes/course-routes");

let port = 8888;
if (process.env.PORT) {
  port = process.env.PORT;
}

const app = express();
const sessionConfig = createSessionConfig();
//FOR EJS
app.set("view engine", "ejs"); //set to use ejs engine for rendering views
app.set("views", path.join(__dirname, "views")); // where to find the views .join used for all OS
//
//BASIC SETTINGS

app.use(express.static("public")); //need to set public files or css wont work
app.use(express.urlencoded({ extended: false })); // for extracting HTML form POST

app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(basicRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(courseRoutes);

db.connectDb()
  .then(function () {
    app.listen(port);
    console.log("DB CONNECTED");
  })
  .catch(function (error) {
    console.log(error);
  });
