const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Veggie extends Model {}

Veggie.init({
    veggie_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    veggie_type: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    veggie_price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {sequelize, modelName: 'veggie', timestamps: false})

module.exports = Veggie