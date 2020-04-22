const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class MeatSelection extends Model{}

MeatSelection.init({

}, {sequelize, modelName: 'meat_selection', timestamps: true, underscored: true})

module.exports = MeatSelection