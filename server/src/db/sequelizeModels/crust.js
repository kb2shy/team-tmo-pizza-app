const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Crust extends Model {}

Crust.init({
    crust_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    crust_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, modelName: 'crust', timestamps: false})

module.exports = Crust