const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("the server is running on the port", 3000);
});

fetch("http://www.raydelto.org/agenda.php").then((promesaFetch) =>
  promesaFetch.json()
);
