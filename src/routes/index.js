const router = require('express').Router();

const userRouter = require('./users.routes');
const roleRouter = require('./role.routes')
const authRouter = require('./auth.routes')

function setupRouter(app) {
    // http://localhost:3000/api/v1/users
    app.use('/api/v1', router);
    router.use('/users', userRouter);
    router.use('/role', roleRouter);
    router.use('/auth', authRouter);

}

module.exports = setupRouter;
