const { Model, DataTypes, Sequelize } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleModel = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createAt: {
        field: 'created_at',
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW(),
        allowNull: false
    }
};

class Role extends Model {
    static associate(models) {
        this.hasOne(models.User, {
            as: 'User',
            foreignKey: 'idRole'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ROLE_TABLE,
            modelName: "Role",
            timestamps: false
        }
    }
};

module.exports = {
    ROLE_TABLE,
    RoleModel,
    Role
}