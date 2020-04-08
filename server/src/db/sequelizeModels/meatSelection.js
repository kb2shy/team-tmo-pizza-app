const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class MeatSelection extends Model{}

MeatSelection.init({
    meat_selection_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pizza_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {sequelize, modelName: 'meatSelection', timestamps: false})

module.exports = MeatSelection