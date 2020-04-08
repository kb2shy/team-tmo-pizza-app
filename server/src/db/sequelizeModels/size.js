const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Size extends Model {}

Size.init({
    size_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            notNull: true, 
            notEmpty: true,
        }
    }
}, {sequelize, modelName: 'size', timestamps: false})

module.exports = Size