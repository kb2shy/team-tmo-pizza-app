const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Cheese extends Model {}

Cheese.init({
    cheese_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cheese_type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isAlpha: true,
            notNull: true, 
            notEmpty: true,
        }
    },
    cheese_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {sequelize, modelName: 'cheese', timestamps: false})

module.exports = Cheese