const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const conection = require ('../database/index')

app.set('port',port)
app.use(express.json())




module.exports = app