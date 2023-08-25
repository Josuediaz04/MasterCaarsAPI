const {models} = require ('../../libs/sequelize')
const boom  = require ('@hapi/boom')


class ServiceDetails {

    async create(data){
        console.log(models);
        const service  = await models.ServiceDetails.create(data)
        return service;
    }

    async ReadAll () {
        const services = await models.ServiceDetails.findAll()
        if (!services) {
            throw boom.notFound('Services details Not found')
        };
        return services;
    }

    async readByPk(id){
        const service = await models.ServiceDetails.findByPk(id)
        if (!service) {
            throw boom.notFound(`Service detail with id ${id} not found` )
        }
        return service;
    }

    async update(id,data){
        const service = await this.readByPk(id)
        const serviceUpdated = await service.update(data);
        return serviceUpdated
    }

    async delete(id){
        const service = await this.ServiceDetails(id)
        await service.destroy();
    }

}

module.exports = ServiceDetails