const {Sequelize} = require('sequelize')

//Change DB config for your info ('db_name', 'db_username', 'db_password')
//this is specific to our RDS db instance 
const sequelize = new Sequelize({
    username: 'root',
    password: 'yWThhHvqPsRqGfjcz7G9',
    database: 'pizzastore',
    host: 'pizzastore.c9bfrf2xseps.us-west-2.rds.amazonaws.com',
    dialect: 'mssql',
    dialectOptions:{
        options: {
            useUTC: false,
            dateFirst: 1
        }
    }
})

module.exports = sequelize