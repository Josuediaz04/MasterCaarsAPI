const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./usersModel');
const { JOB_TABLE } = require('./jobModel');


const EMPLOYEE_TABLE = 'employees';

const EmployeeModel = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    idJob: {
        field: 'id_job',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model : JOB_TABLE,
            key: 'id'
        },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
    },
    dui: {
        type: DataTypes.STRING,
        allowNull: true
    },
    direction: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
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
        onDelete: 'CASCADE',
    },
    createAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW(),
        allowNull: false
    }
};

class Employee extends Model {
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'idUser'
        });
        this.belongsTo(models.Job, {
            as: 'job',
            foreignKey: 'idJob'
        });

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