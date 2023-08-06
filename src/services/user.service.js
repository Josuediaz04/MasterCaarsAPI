const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UserService{

    async create(data) {
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = {
            ...data,
            password: hash
        }
        const user = await models.User.create(newUser);
        delete user.dataValues.password;
        return user;
    }

    async readAll(){
        console.log(models);
        const users = await models.User.findAll({
            include: ['role']
        });
        if(!users){
            throw boom.notFound('No records found');
        };
        return users;
    }

    async readByPk(id){
        const user = await models.User.findByPk(id, {
            include: ['role']
        });
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