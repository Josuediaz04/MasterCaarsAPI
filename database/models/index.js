const { UserModel, User } = require('./usersModel');
const { RoleModel, Role } = require('./roleModel');
const { EmployeeModel, Employee } = require('./employeesModel');
const { ServiceModel, Service } = require('./ServiceModel');
const { ServiceDetailsModel, ServiceDetails } = require('./servicesDetailsModel');
const { JobModel, Job } = require('./jobModel');

function setupModel(sequelize) {
    User.init(UserModel, User.config(sequelize));
    Role.init(RoleModel, Role.config(sequelize));
    Employee.init(EmployeeModel, Employee.config(sequelize));
    Service.init(ServiceModel, Service.config(sequelize));
    ServiceDetails.init(ServiceDetailsModel, ServiceDetails.config(sequelize));
    Job.init(JobModel, Job.config(sequelize));

    User.associate(sequelize.models);
    Role.associate(sequelize.models);
    Employee.associate(sequelize.models);
    Service.associate(sequelize.models);
    ServiceDetails.associate(sequelize.models);
    Job.associate(sequelize.models);
}

module.exports = setupModel;
