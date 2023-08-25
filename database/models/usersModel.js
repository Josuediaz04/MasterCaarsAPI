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
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idRole: {
        field: 'id_role',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ROLE_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        defaultValue: 2
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
            as: 'role',
            foreignKey: 'idRole'
        });
        this.hasOne(models.Employee, {
            as: 'employee',
            foreignKey: 'idUser'
        });
        this.hasMany(models.ServiceDetails, {
            as: 'receivedServices',
            foreignKey: 'idUser'
        });
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