const { Model, DataTypes, Sequelize } = require('sequelize');

const { ROLE_TABLE } = require('./roleModel');

const USER_TABLE = 'users';

const UserModel = {
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
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        default: true,
    },
    idRole: {
        field: 'id_role',
        type: DataTypes.INTEGER,
        references: {
            model: ROLE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createAt: {
        field: 'created_at',
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW(),
        allowNull: false
    }
};

class User extends Model {
    static associate(models) {
        this.belongsTo(models.Role, {
            as: 'Roles'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false
        }
    }
};

module.exports = {
    USER_TABLE,
    UserModel,
    User
}