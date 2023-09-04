const SpareServices = require ('../services/role.service')
const services = new SpareServices
const router = require('express').Router()
const validatorHandler = require('../../middlewares/validatorHandler')
const {createSpare,updateSpare,getSpare} = require ('../schemas/spare.Schema')
const passport = require('passport')
const { any, date } = require('joi')


router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req,res,next) => {
        try {
            const spare = await services.ReadAll()
            res.status(200).json({
                statusCode: 200,
                message: 'spare fetched',
                data: spare
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
);


router.get('/:id',
passport.authenticate('jwt', {session: false}),
validatorHandler(getSpare, 'params'),
async(req,res,next)=>{
    try {
        const {id} = req.params;
        const spare = await services.readByPk(id);
        res.status(302).json({
            statusCode :  302 ,
            message :"spare found",
            data:spare
        })
    } catch (error) {
        next(error)
        console.log(error)
    }
}

)

router.post('/',
    passport.authenticate('jwt',{session: false}),
    validatorHandler(createSpare,'body'),
    async(req,res,next)=> {
        try {
            const spare = await services.create(req.body)
            res.status(201).json({
                statusCode:   201 ,
                message: 'spare created',
                data: spare 
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
)


router.patch('/:id',
    passport.authenticate('jwt',{session: false}),
    validatorHandler(getSpare,'params'),
    validatorHandler(updateSpare,'body'),
    async(req,res,next)=>{
         try {
            const {id} = req.params
            const spare=await  services.update( id, req.body)
            res.status(302).json({
                statusCode: 302 ,
                message:'spare updated' ,
                data:spare
            })
         } catch (error) {
            next(error)
            console.log(error)
         }
    }
)


router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    validatorHandler(getSpare,'params'),
    async(req,res,next)=>{
        try {
            const {id} = req.params;
            await services.delete(id)
            res.status(202).json({
                statusCode :  202 ,
                message:"spare deleted",
                data:id
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
)

module.exports = router;