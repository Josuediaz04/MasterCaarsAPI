const {models} = require ('../../libs/sequelize')
const boom  = require ('@hapi/boom')


class Services {

    async create(data, imageUrl){
        const dto = {
            ...data,
            imgUrl: imageUrl
        };

        console.log(dto);
        try {
            const service = await models.Service.create(dto);
            return service;
        } catch (error) {
            console.error('Error al crear el servicio:', error);
            throw error; 
        }
        
    }

    async ReadAll () {
        const services = await models.Service.findAll()
        if (!services) {
            throw boom.notFound('Services Not found')
        };
        return services;
    }

    async readByPk(id){
        const service = await models.Service.findByPk(id)
        if (!service) {
            throw boom.notFound(`Service with id ${id} not found` )
        }
        return service;
    }

    async update(id,data){
        const service = await this.readByPk(id)
        const serviceUpdated = await service.update(data);
        return serviceUpdated
    }

    async delete(id){
        const service = await this.Service(id)
        await service.destroy();
    }

}

module.exports = Services