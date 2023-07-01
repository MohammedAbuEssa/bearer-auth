"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const postgres_URL =
  process.env.NODE_ENV === "test" ? "sqlite::memory" : process.env.DATABASE_URL;
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
let sequelize = new Sequelize(postgres_URL, sequelizeOptions);

module.exports = { sequelize, DataTypes, postgres_URL };
