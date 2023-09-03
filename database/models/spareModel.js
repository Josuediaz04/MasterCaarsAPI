const { Model, DataTypes } = require('sequelize');

const SPARE_TABLE = 'car_spare';

const spareModel = {
    id:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    articleSpare:{
        type: DataTypes.STRING,
        allowNull :false,
        fild: 'article_spare'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        allowNull: false,
        type:DataTypes.DOUBLE,
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    brandSpare: {
        field: 'brand_spare',
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        allowNull: false,
        type: DataTypes.STRING
    }
}

class Spare extends Model {
    static associate(models) {

    }

    static config(sequelize) {
        return{
            sequelize,
            tableName: SPARE_TABLE,
            modelName: 'Spare',
            timestamps: false
        }
    }
}

module.exports = {
    Spare,
    SPARE_TABLE,
    spareModel
}