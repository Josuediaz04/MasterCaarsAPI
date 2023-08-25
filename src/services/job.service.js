const {models} = require ('../../libs/sequelize')
const boom  = require ('@hapi/boom')


class JobServices {

    async create(data){
        const job  = await models.Job.create(data)
        return job;
    }

    async ReadAll () {
        const jobs = await models.Job.findAll()
        if (!jobs) {
            throw boom.notFound('Job Not found')
        };
        return jobs;
    }

    async readByPk(id){
        const job = await models.Job.findByPk(id)
        if (!job) {
            throw boom.notFound(`Job with id ${id} not found` )
        }
        return job;
    }

    async update(id,data){
        const job = await this.readByPk(id)
        const jobUpdated = await job.update(data);
        return jobUpdated;
    }

    async delete(id){
        const job = await this.readByPk(id)
        await job.destroy();
    }

}

module.exports = JobServices;