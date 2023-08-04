const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserService{

    async create(data) {
        const hash = await bcrypt.hash(data.password);
        const newUser = {
            ...data,
            password: hash
        }
        const user = await models.User.create(newUser);
        delete user.dataValues.password;
        return user;
    }

    async readAll(){
        const users = await models.User.findAll();
        if(!users){
            throw boom.notFound('No records found');
        };
        delete users.dataValues.password;
        return users;
    }

    async readByPk(id){
        const user = await models.User.findByPk(id);
        if(!user) {
            throw boom.notFound(`Record with id ${id} not found`);
        }
        delete user.dataValues.password;
        return user;
    }

    async update(id, data) {
        const user = await this.readByPk(id);
        await user.update(data);
        const userUpdated = await this.readByPk(id);
        delete userUpdated.dataValues.password;
        return userUpdated;
    }

    async delete(id) {
        const user = await this.readByPk(id);
        await user.destroy();
    }
}

module.exports = UserService;