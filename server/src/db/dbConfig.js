const {Sequelize} = require('sequelize')
const config = require('config')

//Change DB config for your info ('db_name', 'db_username', 'db_password')
//this is specific to our RDS db instance 
const sequelize = new Sequelize({
    username: config.get('db.username'),
    password: config.get('db.password'),
    database: config.get('db.database'),
    host: config.get('db.host'),
    dialect: 'mssql',
    dialectOptions:{
        options: {
            useUTC: false,
            dateFirst: 1
        }
    }
})

module.exports = sequelize