const UserService = require('../services/user.service');
const { createUser, updateUser, getUser, preCreateUser } = require('../schemas/user.Schema');
const  validatorHandler = require('../../middlewares/validatorHandler');
const passport = require('passport');
const AuthService = require('../services/auth.service');
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

const router = require('express').Router();

const service = new UserService;
const auth = new AuthService;
const bodyHtml = fs.readFileSync(path.join(__dirname, '../mail/singup.html'), 'UTF-8');
const customerHtml = fs.readFileSync(path.join(__dirname, '../mail/customer.html'), 'UTF-8');

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const users = await service.readAll();
            res.status(200).json({
                statusCode: 200,
                message: 'users fetched',
                data: users
            });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    validatorHandler(getUser, 'params'),
    passport.authenticate('jwt', { session: false }),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.readByPk(id);
            res.status(302).json({
                statusCode: 302,
                message: 'user found',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/register',
    validatorHandler(createUser),
    async(req, res, next) => {
        passport.authenticate('jwtLogin', {session: false}, async(err, user) => {
            try {
                const data = req.body;
                if (!user) {
                    throw boom.unauthorized('Fallo la validacion.');
                }
                const createUser = await service.createUser(data, user);
                const getUser = {
                    sub: createUser.dataValues.id,
                    code: createUser.dataValues.verificationCode
                }
                const token = await auth.singToken(getUser);
                res.status(202).json({
                    statusCode: 202,
                    message:'created successfully',
                    data: createUser,
                    token: token
                })
            } catch (error) {
                next(error);
            }
        })(req, res, next)
    }
);

router.post('/register',
    validatorHandler(preCreateUser, 'body'),
    async(req, res, next)=> {
        try {
            const { role } = req.query;
            const code = auth.generarCodigo();
            const user = await service.create(req.body, code);
            const token = await auth.signUp(user);
            if (role == 'admin') {
                var html = bodyHtml.replace('{{token}}', token);
            } else {
                var html = customerHtml.replace('{{code}}', code);
            }
            await auth.sendMail(user, 'Registro de cuenta Master Cars', html);
            res.status(201).json({
                statusCode: 201,
                message: 'user created',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getUser, 'params'),
    validatorHandler(updateUser, 'body'),
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            const user = await service.update(id, req.body);
            res.status(202).json({
                statusCode: 202,
                message: 'user updated',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(getUser, 'params'),
    async(req, res, next)=> {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(202).json({
                statusCode: 202,
                message: 'user deleted',
                data: id
            });
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;
