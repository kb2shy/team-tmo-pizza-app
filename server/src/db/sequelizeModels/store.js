const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Store extends Model {}

Store.init({
    store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    store_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {sequelize, modelName: 'store', timestamps: false})

module.exports = Store