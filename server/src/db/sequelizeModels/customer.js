const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbConfig')

class Customer extends Model {} 

Customer.init({
    customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true, 
            notEmpty: true,
            isAlpha: true
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
            isAlpha: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true, //checks for email format (example@email.com)
            notNull: true, 
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    registered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE, 
        field: 'created_at'
    }
}, { sequelize, modelName: 'customer', timestamps: true, underscored: true})


module.exports = Customer 