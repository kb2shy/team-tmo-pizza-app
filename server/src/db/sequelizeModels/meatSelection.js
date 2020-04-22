const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class MeatSelection extends Model{}

MeatSelection.init({

}, {sequelize, modelName: 'meatSelection', timestamps: true, underscored: true})

module.exports = MeatSelection