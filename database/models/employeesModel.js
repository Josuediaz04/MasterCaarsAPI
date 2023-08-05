const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./usersModel');

const EMPLOYEE_TABLE = 'employees';

const EmployeeModel = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dui: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idUser: {
        field: 'id_user',
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    },
    createAt: {
        field: 'created_at',
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW(),
        allowNull: false
    }
};

class Employee extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'idUser'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: EMPLOYEE_TABLE,
            modelName: "Employee",
            timestamps: false
        }
    }
};

module.exports = {
    EMPLOYEE_TABLE,
    EmployeeModel,
    Employee
}