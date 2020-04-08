const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class VeggieSelection extends Model{}

VeggieSelection.init({
}, {sequelize, modelName: 'veggieSelection', timestamps: false})

module.exports = VeggieSelection