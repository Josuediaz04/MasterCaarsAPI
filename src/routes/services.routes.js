const Services = require('../services/services.service');
const router = require('express').Router();
const  validatorHandler = require('../../middlewares/validatorHandler');
const { createService, getService, updateService } = require ('../schemas/service.schema');
const passport = require('passport');
const  cloudinary = require('cloudinary');
const { cloudinaryConfig } = require('../../config/index');
const fs = require('fs-extra');

cloudinary.config({
    cloud_name: cloudinaryConfig.name,
    api_key: cloudinaryConfig.key,
    api_secret: cloudinaryConfig.secret
})

console.log(cloudinaryConfig.name + ' => name de cloudinary');

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
    validatorHandler(getService,'params'),
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
            next(error);
        }
    }
)

router.post('/',
    //validatorHandler( createService, 'body' ),
    //passport.authenticate('jwt', { session: false }),
    async(req,res,next)=>{
        try {
            console.log(req.file);
            const image = await cloudinary.v2.uploader.upload(req.file.path);

            console.log(image.secure_url);
            const service = await  services.create(req.body, image.secure_url);
            res.status(201).json({
                statuscode : 201,
                messsage: 'service created successfully ',
                data: service
            })
            await fs.unlink(req.file.path)
        } catch (error) {
            next(error);
        }
    }
)

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler( getService, 'params'),
    validatorHandler( updateService, 'body'),
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
    validatorHandler( getService, 'params' ),
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