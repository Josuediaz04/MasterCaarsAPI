const AuthService = require('../services/auth.service');
const { login } = require('../schemas/auth.Schema');
const validatorHandler = require('../../middlewares/validatorHandler')
const passport = require('passport');

const router = require('express').Router();

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

module.exports = router;
