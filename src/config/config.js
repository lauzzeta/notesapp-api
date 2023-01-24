const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "./.env"),
});
module.exports = {
  development: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.db,
    host: process.env.host,
    dialect: process.env.dialect,
  },
  test: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.db,
    host: process.env.host,
    dialect: process.env.dialect,
  },
  production: {
    username: process.env.user,
    password: process.env.password,
    database: process.env.db,
    host: process.env.host,
    dialect: process.env.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
