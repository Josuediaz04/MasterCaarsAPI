const express = require('express')
const port = process.env.PORT || 3000
const app = express();
const setupRouter = require('./routes');
const multer = require('multer')
const {storage} = require('../middlewares/multerHandler');


const {
	logErrors, ormHandler, boomErrorHandler, errorHandler,
} = require('../middlewares/errorHandler');

app.set('port',port)
app.use(express.json())

require('./auth/index');

setupRouter(app);


app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(multer({ storage }).single("file"));

// middlewares
app.use(logErrors);
app.use(ormHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, "../public")));

module.exports = app