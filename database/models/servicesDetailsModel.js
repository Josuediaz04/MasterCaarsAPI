const { Model, DataTypes, Sequelize } = require('sequelize');
const { SERVICES_TABLE } = require('./ServiceModel');
const { USER_TABLE } = require('./usersModel');
const { EMPLOYEE_TABLE } = require('./employeesModel');

const SERVICES_DETAILS_TABLE = 'services_details';

var fechaActual = new Date();

var año = fechaActual.getFullYear();
var mes = fechaActual.getMonth() + 1;
var dia = fechaActual.getDate();
var hora = fechaActual.getHours();
var minutos = fechaActual.getMinutes();
var segundos = fechaActual.getSeconds();

var now = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

const ServiceDetailsModel = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    quantity: {
        allowNull: true,
        type: DataTypes.INTEGER,

    },
    amountService: {
        allowNull: true,
        type: DataTypes.DOUBLE
    },
    amountSpare: {
        allowNull: true,
        type: DataTypes.DOUBLE
    },
    discount: {
        allowNull: true,
        type: DataTypes.DOUBLE
    },
    total: {
        allowNull: false,
        type :DataTypes.DOUBLE
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
    idEmployee: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id_employee",
        references:{
            model: EMPLOYEE_TABLE,
            key: "id"
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
    },
    idSpare: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id_spare",
        references:{
            model: SPARE_TABLE,
            key: "id"
        },
        onDelete: "NO ACTION",
        onUpdate: "CASCADE"
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    dateAdmission: {
        allowNull: false,
        field:'date_admission',
        type: DataTypes.DATE,
        defaultValue: now
    },
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