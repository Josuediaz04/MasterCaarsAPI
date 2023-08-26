const { models } = require('../../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const AuthService = require('./auth.service');

const service = new AuthService;

class UserService{

    async create(data, code) {
        const dto = {
            ...data,
            verificationCode: code
        }
        const newUser = await models.User.create(dto);
        const user = await this.readByPk(newUser.dataValues.id);
        delete user.dataValues.password;
        return user;
    }

    async createUser(data, payload){
        const user = await service.readByEmail(payload.email);
        if (payload.status !== user.dataValues.status) {
            throw boom.badRequest("El registro solo puede ser completado una vez.");
        } if (payload.email !== data.email) {
            throw boom.unauthorized("el correo electrónico proporcionado debe ser el mismo que el registrado");
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
            include: ['role', 'receivedServices', 'employee']
        });
        if(!users){
            throw boom.notFound('No records found');
        };
        return users;
    }

    async readByPk(id){
        const user = await models.User.findByPk(id, {
            include: ['role', 'receivedServices', 'employee']
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