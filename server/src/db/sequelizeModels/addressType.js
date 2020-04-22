const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class AddressType extends Model {}

AddressType.init({
    address_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {sequelize, modelName: 'addressType', timestamps: true, underscored: true})

module.exports = AddressType