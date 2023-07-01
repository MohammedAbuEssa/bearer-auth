"use strict";
const base64 = require("base-64");
const userModel = require("../models/users");

function basicAuth(req, res, next) {
  if (req.headers.authorization) {
    let encoded = req.headers.authorization.split(" ");
    let code = encoded.pop();
    let decoded = base64.decode(code);
    let [username, password] = decoded.split(":");
    console.log(username);
    userModel
      .authBasic(username, password)
      .then((data) => {
        req.user = data;
        next();
      })
      .catch((error) => {
        next("invalid Login:" + error.message);
      });
  } else next("invalid Login: you are not signing in");
}
module.exports = basicAuth;
