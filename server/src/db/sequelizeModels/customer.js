const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Customer extends Model {} 

Customer.init({
    customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preferred_location: {
        type: DataTypes.INTEGER
    }
}, { sequelize, modelName: 'customer'})


module.exports = Customer 