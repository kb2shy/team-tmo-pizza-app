const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Order extends Model {}

Order.init({
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    completed:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    delivery: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    //timestamp created automatically
}, {sequelize, modelName: 'order', timestamps: true, underscored: true})

module.exports = Order
