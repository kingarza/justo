const express = require("express");
const router = express.Router();
const postgres = require("../middleware/postgres");

router.get("/", async (req, res) => {
  let data = await postgres.getHits("boss", "1");
  // let data = await postgres.getHits("manager", "m1@test.com");
  //let data = await postgres.getHits("hitman", "h1@test.com");
  res.render("hits", { data, sendAlert: req.query.showAlert === "true" });
});

router.post("/create", async (req, res) => {
  console.log("req.body");
  console.log(req.body);
  let maxHitId = await postgres.getMaxHitId();
  await postgres.createHit("hitman", [
    `${maxHitId + 1}`,
    req.body.assignedTo,
    req.body.description,
    req.body.target,
    "TRUE",
  ]);
  res.redirect("/hits?showAlert=true");
});

router.get("/create", async (req, res) => {
  let dependents = await postgres.getDependents("boss", "1");
  res.render("hit_create", { data: dependents });
});

router.get("/:id", async (req, res) => {
  // se hace querie en base al id ingresado
  let person = await postgres.getHit(req.params.id);
  res.render("hit_details", { person: person[0] });
});

module.exports = router;
