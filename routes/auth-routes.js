const express = require("express");
const db = require("../database/database");
const authController = require("../controllers/auth-controller");
const router = express.Router();

router.get("/signup", authController.getSignUpView);
router.get("/login", authController.getLogInView);

router.post("/signup", authController.signUp);
router.post("/login", authController.logIn);

module.exports = router;
