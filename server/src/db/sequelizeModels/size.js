const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Size extends Model {}

Size.init({
    size_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    size_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'size', timestamps: false})

module.exports = Size