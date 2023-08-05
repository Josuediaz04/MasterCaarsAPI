const RoleServices = require('../services/role.service')
const services = new RoleServices
const router = require('express').Router()
const  validatorHandler = require('../../middlewares/validatorHandler')
const {createRole,getRole,updateRole} = require ('../schemas/role.sechema')
const passport = require('passport')

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req,res,next)=>{
        try {
            const role = await services.ReadAll()
            res.status(200).json({
                statusCode: 200,
                message: 'role fetched',
                data: role
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
);

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getRole,'params'),
    async(req,res,next)=>{
        try {
        const {id} = req.params;
        const role  = await services.readByPk(id);
        res.status(302).json({
            statusCode: 302,
            message: 'role Found',
            data: role
        })
        } catch (error) {
            next(error)
            console.log(error)  
        }
    }
)

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createRole,'body'),
    async(req,res,next)=>{
        try {
            const role = await  services.create(req.body)
            res.status(201).json({
                statuscode : 201,
                messsage:'role created successfully ',
                data:role
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(updateRole, 'body'),
    async(req,res,next)=>{
        try {
            const {id} = req.params
            const role = await services.update(id,req.body)
            res.status(302).json({
                statusCode: 302,
                messege:"role updated",
                data: role
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getRole, 'params'),
    async(req,res,next)=>{
        try {
            const {id} = req.params;
            await services.delete(id)
            res.status(202).json({
                statusCode: 202,
                message :"role deleted ",
                data: id
            })
        } catch (error) {
            next(error)
            console.log(error)  
        }
    }
)

module.exports = router