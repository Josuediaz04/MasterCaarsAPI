const { Model, DataTypes, Sequelize } = require('sequelize');

const JOB_TABLE = 'jobs';

const JobModel = {
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

class Job extends Model {
    static associate(models) {
        this.hasOne(models.Employee, {
            as: 'Employee',
            foreignKey: 'idJob'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: JOB_TABLE,
            modelName: "Job",
            timestamps: false
        }
    }
};

module.exports = {
    JOB_TABLE,
    JobModel,
    Job
}