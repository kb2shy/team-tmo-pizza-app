const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class OrderItem extends Model{}

OrderItem.init({

}, {sequelize, modelName: 'order_item', timestamps: true, underscored: true})

module.exports = OrderItem