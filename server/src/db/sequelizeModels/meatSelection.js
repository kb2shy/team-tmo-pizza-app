const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class MeatSelection extends Model{}

MeatSelection.init({

}, {sequelize, modelName: 'meatSelection', timestamps: false})

module.exports = MeatSelection