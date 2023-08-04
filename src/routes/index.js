const router = require('express').Router();

const userRouter = require('./users.routes');
const roleRouter = require('./role.routes')

function setupRouter(app) {
    // http://localhost:3000/api/v1/users
    app.use('/api/v1', router);
    router.use('/users', userRouter)
    router.use('/role', roleRouter)

}

module.exports = setupRouter;
