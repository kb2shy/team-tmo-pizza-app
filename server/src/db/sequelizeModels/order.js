const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Order extends Model {}

Order.init({
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_items_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {sequelize, modelName: 'order'})

module.exports = Order