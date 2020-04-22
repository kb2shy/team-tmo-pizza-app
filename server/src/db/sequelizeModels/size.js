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
        allowNull: false,
        unique: true, 
        validate: {
            notNull: true, 
            notEmpty: true,
        }
    },
    size_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {sequelize, modelName: 'size', timestamps: true, underscored: true})

module.exports = Size