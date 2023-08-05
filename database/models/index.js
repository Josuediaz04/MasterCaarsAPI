const { UserModel, User } = require('./usersModel.js');
const { RoleModel, Role } = require('./roleModel.js');

function setupModel(sequelize) {
    User.init(UserModel, User.config(sequelize));
    Role.init(RoleModel, Role.config(sequelize));

    User.associate(sequelize.models);
    Role.associate(sequelize.models);
}

module.exports = setupModel;
