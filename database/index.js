const config = require("../config");

let URI = config.DB_URI;

console.log(URI);

module.exports = {
  development: {
    url: URI,
    dialect: "mssql"
  },
  production: {
    url: URI,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
        trustServehrCertificate: true,
      },
    },
  },
};
