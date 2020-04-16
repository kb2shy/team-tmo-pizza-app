const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Pizza extends Model {}

Pizza.init({
    pizza_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    crust_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    sauce_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {sequelize, modelName: 'pizza', timestamps: false})

module.exports = Pizza