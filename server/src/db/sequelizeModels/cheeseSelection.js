const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class CheeseSelection extends Model{}

CheeseSelection.init({
    cheese_selection_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pizza_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {sequelize, modelName: 'cheeseSelection', timestamps: false})

module.exports = CheeseSelection