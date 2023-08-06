const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const config = require('../../config');

class AuthService{

    async readByEmail(email){
        const user = await models.User.findOne({
            where: {
                email
            },
            include: ['role']
        });
        return user;
    }

    async singToken(user) {
        const payload = {
            sub: user.id,
            status: user.status
        }
        const token = await jwt.sign(payload, config.JwtSecret, { expiresIn: '72 hours' });
        return token;
    }
}

module.exports = AuthService;