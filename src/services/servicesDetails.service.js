const {models} = require ('../../libs/sequelize')
const boom  = require ('@hapi/boom')


class ServiceDetails {

    async create(data){
        console.log(models);
        const service  = await models.ServiceDetails.create(data)
        return service;
    }

    async ReadAll (query) {
        const options = {
            include: ['user','employee','spare','service'],
            where: {}
        };
        const { limit, offset } = query;
        if (limit && offset) {
            options.limit = parseInt(limit);
            options.offset = parseInt(offset);
        } 
        const { status } = query;
        if (status) {
            options.where = {
                status: status
            }
        } else {
            options.where = {
                status: false
            }
        }
        const services = await models.ServiceDetails.findAll(options);
        if (!services) {
            throw boom.notFound('Services details Not found')
        };
        return services;
    }

    async readByPk(id){
        const service = await models.ServiceDetails.findByPk(id,{ include: ['user','employee','spare','service']})
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