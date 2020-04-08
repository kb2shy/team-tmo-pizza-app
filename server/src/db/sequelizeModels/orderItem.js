const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class OrderItem extends Model{}

OrderItem.init({

}, {sequelize, modelName: 'orderItem', timestamps: false})

module.exports = OrderItem