const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Pizza extends Model {}

Pizza.init({
    pizza_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    size_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    crust_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sauce_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cheese_selection_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    meat_selection_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    veggie_selection_id:{
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {sequelize, modelName: 'pizza', timestamps: false})

module.exports = Pizza