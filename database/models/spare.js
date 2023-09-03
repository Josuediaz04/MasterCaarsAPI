const { Model, DataTypes, Sequelize } = require('sequelize');

const JOB_TABLE = 'spare';

const spareModel = {
    id:{
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    ArticleSpare:{
        type: DataTypes.STRING,
        allowNull :false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    


}