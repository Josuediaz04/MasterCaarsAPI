 const EmployeeService = require('../services/employee.service');
const { createEmployee, updateEmployee, getEmployee } = require('../schemas/employee.Schema');
const  validatorHandler = require('../../middlewares/validatorHandler');
const passport = require('passport');
const cloudinary = require('cloudinary');
const {cloudinaryConfig} = require('../../config/index')
const fs = require('fs-extra');
const router = require('express').Router();
const service = new EmployeeService;


cloudinary.config({
    cloud_name: cloudinaryConfig.name,
    api_key: cloudinaryConfig.key,
    api_secret: cloudinaryConfig.secret

})

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const employees = await service.ReadAll();
            res.status(200).json({
                statusCode: 200,
                message: 'Employees fetched',
                data: employees
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getEmployee, 'params'),
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const employee = await service.readByPk(id);
            res.status(302).json({
                statusCode: 302,
                message: 'Employee found',
                data: employee
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    // validatorHandler(createEmployee, 'body'),
    // passport.authenticate('jwt', { session: false }),
    async(req, res, next)=> {
        try {
            console.log(req.file);
            const image = await cloudinary.v2.uploader.upload(req.file.path)
            console.log(image.secure_url);
            const employee = await service.create(req.body,image.secure_url);
            res.status(201).json({
                statusCode: 201,
                message: 'Employee created',
                data: employee
            });
            await fs.unlink(req.file.path)
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getEmployee, 'params'),
    validatorHandler(updateEmployee, 'body'),
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            const employee = await service.update(id, req.body);
            res.status(202).json({
                statusCode: 202,
                message: 'Employee updated',
                data: employee
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getEmployee, 'params'),
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'Employee deleted',
                data: id
            });
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;
