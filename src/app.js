const express = require('express')
const port = process.env.PORT || 3000
const app = express();
const setupRouter = require('./routes');

app.set('port',port)
app.use(express.json())

setupRouter(app);


module.exports = app