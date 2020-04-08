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
        allowNull: false
    }
}, {sequelize, modelName: 'meat', timestamps: false})

module.exports = Meat