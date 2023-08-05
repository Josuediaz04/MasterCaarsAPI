const {models} = require ('../../libs/sequelize')
const boom  = require ('@hapi/boom')


class RoleServices {

    async create(data){
        const role  = await models.Role.create(data)
        return role;
    }

    async ReadAll () {
        const role = await models.Role.findAll()
        if (!role) {
            throw boom.notFound('Role Not found')
        };
        return role;
    }

    async readByPk(id){
        const role = await models.Role.findByPk(id)
        if (!role) {
            throw boom.notFound(`Role with id ${id} not found` )
        }
        return role;
    }

    async update(id,data){
        const role = await this.readByPk(id)
        const roleUpdated = await role.update(data);
        return roleUpdated
    }

    async delete(id){
        const role = await this.readByPk(id)
        await role.destroy();
    }

}

module.exports = RoleServices