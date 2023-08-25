const Services = require('../services/servicesDetails.service');
const router = require('express').Router();
const  validatorHandler = require('../../middlewares/validatorHandler');
const { createServiceDetails, getServiceDetails, updateServiceDetails } = require ('../schemas/servicesDetails.chema');
const passport = require('passport')

const services = new Services;

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req,res,next)=>{
        try {
            const service = await services.ReadAll();
            res.status(200).json({
                statusCode: 200,
                message: 'service fetched',
                data: service
            })
        } catch (error) {
            next(error)
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getServiceDetails,'params'),
    async(req,res,next)=>{
        try {
        const {id} = req.params;
        const service  = await services.readByPk(id);
        res.status(302).json({
            statusCode: 302,
            message: 'service Found',
            data: service
        })
        } catch (error) {
            next(error)
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( createServiceDetails, 'body' ),
    async(req,res,next)=>{
        try {
            console.log(req.body);
            const service = await  services.create(req.body);
            res.status(201).json({
                statuscode : 201,
                messsage: 'service created successfully ',
                data: service
            })
        } catch (error) {
            next(error);
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( getServiceDetails, 'params' ),
    validatorHandler( updateServiceDetails, 'body'),
    async(req,res,next)=>{
        try {
            const {id} = req.params;
            const role = await services.update( id, req.body );
            res.status(302).json({
                statusCode: 302,
                messege:"role updated",
                data: role
            })
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( getServiceDetails, 'params' ),
    async(req,res,next)=>{
        try {
            const {id} = req.params;
            await services.delete(id);
            res.status(202).json({
                statusCode: 202,
                message :"service deleted ",
                data: id
            })
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router