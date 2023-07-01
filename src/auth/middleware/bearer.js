"use strict";

const base64 = require("base-64");
const userModel = require("../models/users");

async function bearerAuth(req, res, next) {
  if (req.headers.authorization) {
    const splitted = req.headers.authorization.split(" ");
    const headerToken = splitted[1];

    userModel
      .authBearer(headerToken)
      .then((data) => {
        req.user = data;
        next();
      })
      .catch((error) => {
        next("invalid token:");
      });
  } else next("no token :sign in to see the contants");
}
module.exports = bearerAuth;
