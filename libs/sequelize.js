const { Sequelize } = require("sequelize");
const config = require("../config");
const setupModels = require("../database/models");

const sequelize = new Sequelize(config.DB_URI, {
  dialect: "mssql",
  logging: config.isProd ? false : console.log,
});

if (!config.isProd) {
  (async function () {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();
}

setupModels(sequelize);

module.exports = sequelize;
