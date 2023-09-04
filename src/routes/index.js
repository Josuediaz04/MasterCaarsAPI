const router = require('express').Router();

const userRouter = require('./users.routes');
const roleRouter = require('./role.routes');
const authRouter = require('./auth.routes');
const employeeRouter = require('./employee.routes');
const servicesRouter = require('./services.routes');
const servicesDetailsRouter = require('./serviceDetails.routes');
const jobRouter = require('./job.routes');
const spareRouter = require('./spare.routes')

function setupRouter(app) {
    // http://localhost:3000/api/v1/users
    app.use('/api/v1', router);
    router.use('/user', userRouter);
    router.use('/role', roleRouter);
    router.use('/auth', authRouter);
    router.use('/employee', employeeRouter);
    router.use('/services', servicesRouter);
    router.use('/service-detail', servicesDetailsRouter);
    router.use('/job', jobRouter);
    router.use('/spare',spareRouter);
}

module.exports = setupRouter;
