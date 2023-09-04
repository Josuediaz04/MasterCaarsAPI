const { Role } = require('../../database/models/roleModel');
const {models} = require ('../../libs/sequelize');
const boom = require('@hapi/boom')

class SpareServices {

    async create(data){
        const spare = await models.Spare.create(data);
        return spare;
    }

    async ReadAll (){
        const spare = await models.Spare.findAll()
        if (!spare) {
            throw boom.notFound('Spare not found')
        };
        return  spare
    }

    async readByPk(id){
        const spare = await models.Spare.findByPk(id)
        if (!spare) {
            throw boom.notFound(`Spare with id ${id} not found`)
        }
        return spare
    }

    async update (id,data){
        const spare = await this.readByPk(id);
        const spareUpdate = await spare.update(data);
        return spareUpdate
    }


    async delete(id){
        const spare = await this.readByPk(id);
        await spare.destroy()
    }

}

module.exports = SpareServices
