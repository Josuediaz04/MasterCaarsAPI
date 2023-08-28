const AuthService = require('../services/auth.service');
const { login, recovery, recoveryPasword } = require('../schemas/auth.Schema');
const validatorHandler = require('../../middlewares/validatorHandler')
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');

const router = require('express').Router();
const bodyHtml = fs.readFileSync(path.join(__dirname, '../mail/recovery.html'), 'utf-8')

const service = new AuthService;

router.post('/login',
    validatorHandler(login, 'body'),
    passport.authenticate('local', { session: false }),
    async(req, res, next) => {
        try {
            const user = req.user;
            const token = await service.singToken(user);
            res.status(302).json({
                statusCode: 302,
                message: 'user fetched',
                data: user,
                token: token
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recovery',
    validatorHandler(recovery, 'body'),
    async(req, res, next) => {
        try {
            const email = req.body.email;
            const user = await service.readByEmail(email);
            if (!user) {
                throw boom.unauthorized('Error');
            }
            var token = await service.recovery(user.dataValues);
            var html = bodyHtml.replace('{{token}}', token);
            await service.sendMail(user.dataValues, 'Recuperacion de cuenta', html);
            res.status(200).send('operation successfully');
        } catch (error) {
            next(error);
        }
    }
)

router.post('/recovery-password',
    validatorHandler(recoveryPasword, 'body'),
    async(req, res, next) => {
        passport.authenticate('jwtRecovery', {session: false}, async(err, user) => {
            try {
                console.log(user);
                if (!user) {
                    throw boom.unauthorized('No token provided');
                }
                const userupdated = await service.updatePassword(req.body, user);
                res.status(202).json(userupdated);
            } catch (error) {
                next(error);
            }
        })(req, res, next);
    }
);

module.exports = router;
