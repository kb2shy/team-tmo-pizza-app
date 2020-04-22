const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class OrderItem extends Model{}

OrderItem.init({

}, {sequelize, modelName: 'orderItem', timestamps: true, underscored: true})

module.exports = OrderItem