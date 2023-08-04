require ('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbName: process.env.DB_NAME,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    DB_URI: process.env.DB_STRING,
    JwtSecret: process.env.JWT_SECRET
}

module.exports = config