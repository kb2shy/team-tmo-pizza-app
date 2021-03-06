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
        allowNull: true,
        defaultValue: 1
    },
    crust_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    sauce_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        defaultValue: 1
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    pizza_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    specialty: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {sequelize, modelName: 'pizza', timestamps: true, underscored: true})

module.exports = Pizza