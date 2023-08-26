const { Model, DataTypes, Sequelize } = require('sequelize');

const SERVICES_TABLE = 'services';

const ServiceModel = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    typeService: {
        allowNull: false,
        type: DataTypes.STRING,

    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "https://static.thenounproject.com/png/583402-200.png"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
};

class Service extends Model {
    static associate(models) {
        // this.hasOne(models.ServiceDetails, {
        //     as: 'ServiceDetails',
        //     foreignKey: 'idService'
        // })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SERVICES_TABLE,
            modelName: "Service",
            timestamps: false
        }
    }
};

module.exports = {
    SERVICES_TABLE,
    ServiceModel,
    Service
}