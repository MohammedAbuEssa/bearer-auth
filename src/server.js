"usev strict";

require("dotenv").config();
const express = require("express");
const app = express();
const userServer = require("./auth/router/users.server");

app.use(express.json());
app.use(userServer);

function start(port) {
  app.listen(port, () => {
    console.log(`this site is up and listen on port ${port}`);
  });
}
module.exports = {
  app: app,
  start: start,
};
