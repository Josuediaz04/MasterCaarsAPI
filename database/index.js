const config = require("../config");

const PASSWORD = encodeURIComponent(config.db_password);
const USER = encodeURIComponent(config.db_user);

let URI = `mssql://${USER}:${PASSWORD}@${config.db_host}/${config.dbName}`

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
