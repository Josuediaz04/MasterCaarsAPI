const { Model, DataTypes, Sequelize } = require('sequelize');
const { SERVICES_TABLE } = require('./ServiceModel');
const { USER_TABLE } = require('./usersModel');

const SERVICES_DETAILS_TABLE = 'services_details';

const ServiceDetailsModel = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    dateAdmission: {
        allowNull: false,
        field:'date_admission',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW()
    },
    dateDelivery: {
        allowNull: true,
        type: DataTypes.DATE,
        field: "date_delivery"
    },
    details: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    amount: {
        allowNull: true,
        type: DataTypes.STRING
    },
    idService: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id_service",
        references: {
            model: SERVICES_TABLE,
            key: "id"
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
    },
    idUser: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id_usuario",
        references:{
            model: USER_TABLE,
            key:"id"
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
};

class ServiceDetails extends Model {
    static associate(models) {
        this.belongsTo(models.Service, {
            as: 'service',
            foreignKey: 'idService'
        });
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'idUser'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SERVICES_DETAILS_TABLE,
            modelName: "ServiceDetails",
            timestamps: false
        }
    }
};

module.exports = {
    SERVICES_DETAILS_TABLE,
    ServiceDetailsModel,
    ServiceDetails
}