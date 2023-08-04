const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');

class AuthService{

    async readByEmail(email){
        const user = await models.User.findOne({
            where: {
                email
            },
        });
        return user;
    }

    async update(id, data) {
        const user = await this.readByPk(id);
        const userUpdated = await user.update(data);
        return userUpdated;
    }
}

module.exports = AuthService;