const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');

class UserService{

    async create(data) {
        const user = await models.User.create(data);
        return user;
    }

    async readAll(){
        const users = await models.User.findAll();
        if(!users){
            throw boom.notFound('No records found');
        };
        return users;
    }

    async readByPk(id){
        const user = await models.User.findByPk(id);
        if(!user) {
            throw boom.notFound(`Record with id ${id} not found`);
        }
        return user;
    }

    async update(id, data) {
        const user = await this.readByPk(id);
        const userUpdated = await user.update(data);
        return userUpdated;
    }

    async delete(id) {
        const user = await this.readByPk(id);
        await user.destroy();
    }
}

module.exports = UserService;