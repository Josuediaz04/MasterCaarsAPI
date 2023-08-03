const { UserModel, User } = require('./usersModel.js')
 
function setupModel(sequelize) {
    User.init(UserModel, User.config(sequelize));

    User.associate(sequelize.models);
}

module.exports = setupModel;
