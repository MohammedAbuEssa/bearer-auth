"usev strict";

const userModel = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bearerAuth = require("../middleware/bearer");
const basicAuth = require("../middleware/basic");

router.post("/signup", signup);
router.post("/signin", basicAuth, signin);
router.get("/secretstuff", bearerAuth, secretstuff);
router.get("/", (req, res) => {
  res.json("Welcome to our server");
});

async function signup(req, res) {
  let hashedPassword = await bcrypt.hash(req.body.password, 5);
  const record = await userModel.create({
    username: req.body.username,
    password: hashedPassword,
  });
  res.status(201).json(record);
}

async function signin(req, res) {
  res.status(200).json(req.user);
}

async function secretstuff(req, res) {
  res.json({
    message: "Welcome to the secret area!",
    "your account": req.user,
  });
}
module.exports = router;
