const {Model, DataTypes} = require('sequelize')
const sequelize = require('../dbConfig')

class OrderItems extends Model{}

OrderItems.init({
    order_items_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pizza_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {sequelize, modelName: 'orderItem', timestamps: false})

module.exports = OrderItems