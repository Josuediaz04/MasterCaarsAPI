const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const AuthService = require('./auth.service');

const service = new AuthService;

class UserService{

    async create(data, code) {
        const newUser = {
            ...data,
            verificationCode: code
        }
        const user = await models.User.create(newUser);
        delete user.dataValues.password;
        return user;
    }

    async createUser(data, payload){
        const user = await service.readByEmail(payload.email);
        if (payload.status !== user.dataValues.status) {
            throw boom.badRequest("registration can only be completed once");
        } if (payload.email !== data.email) {
            throw boom.unauthorized("the email given must be the same as the registered one");
        }
        const hash = await bcrypt.hash(data.password, 10);
        const dto = {
            ...data,
            status: true,
            password: hash
        }
        const userUpdated = await user.update(dto);
        delete userUpdated.dataValues.password;
        return userUpdated;
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