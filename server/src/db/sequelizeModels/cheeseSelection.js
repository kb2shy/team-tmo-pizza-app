const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class CheeseSelection extends Model{}

CheeseSelection.init({
}, {sequelize, modelName: 'cheeseSelection', timestamps: false})

module.exports = CheeseSelection