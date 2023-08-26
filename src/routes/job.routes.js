const JobServices = require('../services/job.service');
const services = new JobServices;
const router = require('express').Router();
const  validatorHandler = require('../../middlewares/validatorHandler');
const { createJob, getJob, updateJob } = require ('../schemas/job.schema');
const passport = require('passport');

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req,res,next)=>{
        try {
            const jobs = await services.ReadAll()
            res.status(200).json({
                statusCode: 200,
                message: 'jobs fetched',
                data: jobs
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( getJob, 'params'),
    async(req,res,next)=>{
        try {
        const {id} = req.params;
        const job  = await services.readByPk(id);
        res.status(302).json({
            statusCode: 302,
            message: 'job Found',
            data: job
        })
        } catch (error) {
            next(error)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( createJob, 'body'),
    async(req,res,next)=>{
        try {
            const job = await  services.create(req.body)
            res.status(201).json({
                statuscode : 201,
                messsage: 'job created successfully ',
                data: job
            })
        } catch (error) {
            next(error)
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( getJob,'params'),
    validatorHandler( updateJob, 'body'),
    async(req,res,next)=>{
        try {
            const {id} = req.params
            const job = await services.update(id,req.body)
            res.status(302).json({
                statusCode: 302,
                messege:"job updated",
                data: job
            })
        } catch (error) {
            next(error);
        }
    }

);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( getJob, 'params'),
    async(req,res,next)=>{
        try {
            const {id} = req.params;
            await services.delete(id)
            res.status(202).json({
                statusCode: 202,
                message :"job deleted ",
                data: id
            })
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router