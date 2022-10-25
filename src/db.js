const { Sequelize } = require("sequelize");

const dialectOptions =
  process.env.environment === "development"
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };

const sequelize = new Sequelize(
  process.env.db,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: process.env.dialect,
    dialectOptions,
    logging: false,
  }
);

module.exports = sequelize;
