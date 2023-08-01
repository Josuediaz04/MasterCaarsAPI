const config = require ('../config/index')

const PASSWORD = encodeURIComponent(config.db_password)
const user = encodeURIComponent(config.db_user)

const dbConfig = {
    user: config.db_user,
    password: config.db_password,
    server: config.db_host,
    port: config.db_port,
    database: config.dbName,
    options: {
      encrypt: true, // Si estás usando una conexión segura, como Azure, establece esto en true
      trustServerCertificate: true, // Esto es opcional y depende de tu configuración de SQL Server
    },
  };
  console.log(dbConfig)
  
  module.exports = {
    development: {
      config: dbConfig,
      dialect: 'mssql',
    },
    production: {
      config: dbConfig,
      dialect: 'mssql',
    },
  };
