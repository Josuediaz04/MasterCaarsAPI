const UserService = require('../services/user.service');
const { login } = require('../schemas/auth.Schema');
const validatorHandler = require('../../middlewares/')

const router = require('express').Router();

const service = new UserService;

router.post('/',
    validatorHandler(login, 'body'),
    async(req, res, next) => {
        try {
            const user = await service.create(req.body);
            res.status(201).json({
                statusCode: 201,
                message: 'user created',
                data: user
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
);

module.exports = router;
