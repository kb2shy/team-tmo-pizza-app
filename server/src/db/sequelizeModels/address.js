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
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Zip: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'address', timestamps: false})

module.exports = Address