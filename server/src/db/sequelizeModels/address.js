const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Address extends Model {}

Address.init({
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlphanumeric: true,
            notNull: true, 
            notEmpty: true,
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha: true, 
            notNull: true, 
            notEmpty: true,
        }
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true, 
            notNull: true, 
            notEmpty: true,
        }
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true
        }
    }
}, {sequelize, modelName: 'address', timestamps: false})

module.exports = Address