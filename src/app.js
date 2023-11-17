const express = require('express')
const port = process.env.PORT || 3000
const app = express();
const setupRouter = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer')
const { storage } = require('../middlewares/multerHandler');


const {
	logErrors, ormHandler, boomErrorHandler, errorHandler,
} = require('../middlewares/errorHandler');

app.set('port',port)
app.use(express.json())
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(multer({ storage }).single("file"));

require('./auth/index');

setupRouter(app);

// middlewares
app.use(logErrors);
app.use(ormHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "../public")));

module.exports = app;