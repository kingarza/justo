const express = require('express');
const router = express.Router();
const postgres = require("../middleware/postgres");

router.get("/", (req, res) => {
  res.render("register");
});

module.exports = router;
