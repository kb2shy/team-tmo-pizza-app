const {Sequelize} = require('sequelize')

//Change DB config for your info ('db_name', 'db_username', 'db_password')
const sequelize = new Sequelize('PizzaStore', 'abigailrivera', 'root', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions:{
        options: {
            useUTC: false,
            dateFirst: 1
        }
    }
})

module.exports = sequelize