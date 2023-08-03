const router = require('express').Router();

const userRouter = require('./users.routes');

function setupRouter(app) {
    // http://localhost:3000/api/v1/users
    app.use('/api/v1', router);
    router.use('/users', userRouter)
}

module.exports = setupRouter;
