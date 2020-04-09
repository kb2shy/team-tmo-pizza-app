const {Sequelize} = require('sequelize')

//Change DB config for your info ('db_name', 'db_username', 'db_password')
const sequelize = new Sequelize('PizzaStore', 'root', 'anton1', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions:{
        options: {
            useUTC: false,
            dateFirst: 1
        }
    }
})

module.exports = sequelize