const {models} = require ('../../libs/sequelize');
const boom  = require ('@hapi/boom');


class EmployeeServices {

    async create(data,imageUrl){

        const dto = {
            ...data,
            imgUrl:imageUrl
        }

        console.log(dto);
        const employee  = await models.Employee.create(dto);
        return employee;   
    }

    async ReadAll () {
        const employees = await models.Employee.findAll({
            include: ['user', 'job']
        }); 
        if (!employees) {
            throw boom.notFound('Employees Not found');
        };
        return employees;
    }

    async readByPk(id){
        const employee = await models.Employee.findByPk(id, {
            include: ['user', 'job']
        });
        if (!employee) {
            throw boom.notFound(`Employee with id ${id} not found` );
        }
        return employee;
    }

    async update(id,data){
        const employee = await this.readByPk(id);
        const employeeUpdated = await employee.update(data);
        return employeeUpdated;
    }

    async delete(id){
        const employee = await this.readByPk(id);
        await employee.destroy();
    }

}

module.exports = EmployeeServices