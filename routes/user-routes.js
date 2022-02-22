const express = require("express");
const router = express.Router();

router.get("/mycourse", (req, res) => {
  res.render("user/myCourse");
});

module.exports = router;
