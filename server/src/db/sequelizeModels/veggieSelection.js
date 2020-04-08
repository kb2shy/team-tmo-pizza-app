const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class VeggieSelection extends Model{}

VeggieSelection.init({
    veggie_selection_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pizza_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {sequelize, modelName: 'orderSelection', timestamps: false})

module.exports = VeggieSelection