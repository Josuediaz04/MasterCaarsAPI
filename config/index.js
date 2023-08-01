require ('dotenv').config();

const config = {
    dbName: process.env.DB_NAME,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD
}

module.exports = config