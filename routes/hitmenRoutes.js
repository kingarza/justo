const express = require('express');
const router = express.Router();
const postgres = require("../middleware/postgres");

router.get("/", (req, res) => {
  res.render("hitmen");
});

router.get("/:id", (req, res) => {
  res.render("hitmen_details");
});

module.exports = router;
