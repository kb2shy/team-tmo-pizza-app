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
            notNull: true, 
            notEmpty: true,
        }
    },
    cheese_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {sequelize, modelName: 'cheese', timestamps: true, underscored: true})

module.exports = Cheese