const { UserModel, User } = require('./usersModel');
const { RoleModel, Role } = require('./roleModel');
const { EmployeeModel, Employee } = require('./employeesModel');

function setupModel(sequelize) {
    User.init(UserModel, User.config(sequelize));
    Role.init(RoleModel, Role.config(sequelize));
    Employee.init(EmployeeModel, Employee.config(sequelize));

    User.associate(sequelize.models);
    Role.associate(sequelize.models);
    Employee.associate(sequelize.models);
}

module.exports = setupModel;
