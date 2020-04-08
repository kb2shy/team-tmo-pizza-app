const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Meat extends Model {}

Meat.init({
    meat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    meat_type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlpha: true,
            notNull: true, 
            notEmpty: true,
        }
    },
    meat_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {sequelize, modelName: 'meat', timestamps: false})

module.exports = Meat