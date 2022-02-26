const express = require("express");
const router = express.Router();

router.get("/mycourse", (req, res) => {
  res.render("user/myCourse");
});
router.get("/newcourse", (req, res) => {
  res.render("user/newcourse");
});

module.exports = router;
