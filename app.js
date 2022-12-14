const PORT = 3000;

const express = require("express");
const bodyParser = require('body-parser');
const registerRoutes = require("./routes/registerRoutes");
const hitsRoutes = require("./routes/hitsRoutes");
const hitmenRoutes = require("./routes/hitmenRoutes");

const app = express();

app.listen(PORT);

app.set("view engine", "ejs");

// reference: https://stackoverflow.com/questions/49891373/how-can-i-add-bootstrap-to-a-project-in-expressjs
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
// Para aceptar información de formularios
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/register", registerRoutes);
app.use("/hits", hitsRoutes);
app.use("/hitmen", hitmenRoutes);

app.get("/", (req, res) => {
  res.render("index");
});
