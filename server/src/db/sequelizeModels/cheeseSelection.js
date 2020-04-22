const {Model} = require('sequelize')
const sequelize = require('../dbConfig')

class CheeseSelection extends Model{}

CheeseSelection.init({
}, {sequelize, modelName: 'cheeseSelection', timestamps: true, underscored: true})

module.exports = CheeseSelection