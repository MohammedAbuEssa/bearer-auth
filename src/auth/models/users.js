"use strict";

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Secret = process.env.SECRET;
const { sequelize, DataTypes } = require("./index");

const users = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Token: {
    type: DataTypes.VIRTUAL,
  },
});
users.authBasic = async function (username, password) {
  const user = await users.findOne({ where: { username: username } });
  if (user) {
    const validUser = await bcrypt.compare(password, user.password);
    if (validUser) {
      let newToken = jwt.sign(
        { username: user.username, password: user.password },
        Secret,
        { expiresIn: 600 }
      );
      user.Token = newToken;
      return user;
    } else {
      throw new Error("wrong password");
    }
  } else throw new Error("wrong username");
};
users.authBearer = async function (token) {
  const validToken = jwt.verify(token, Secret);
  if (validToken) {
    const user = await users.findOne({
      where: { username: validToken.username },
    });
    if (user.username) {
      return user;
    } else throw new Error("invalid token");
  } else throw new Error("wrong Token");
};
module.exports = users;
