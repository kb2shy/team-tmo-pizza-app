const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Sauce extends Model {}

Sauce.init({
    sauce_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sauce_type: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {sequelize, modelName: 'sauce', timestamps: false})

module.exports = Sauce