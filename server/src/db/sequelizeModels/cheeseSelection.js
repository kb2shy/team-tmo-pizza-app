const {Model} = require('sequelize')
const sequelize = require('../dbConfig')

class CheeseSelection extends Model{}

CheeseSelection.init({
}, {sequelize, modelName: 'cheese_selection', timestamps: true, underscored: true})

module.exports = CheeseSelection