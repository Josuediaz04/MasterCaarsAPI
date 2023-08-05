const express = require('express')
const port = process.env.PORT || 3000
const app = express();
const setupRouter = require('./routes');

const {
	logErrors, ormHandler, boomErrorHandler, errorHandler,
} = require('../middlewares/errorHandler');

app.set('port',port)
app.use(express.json())

require('./auth/index');

setupRouter(app);

// middlewares
app.use(logErrors);
app.use(ormHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app