const Sequelize = require('sequelize');

const errHandler = (err) => {
    console.error('Error: ', err);
};

async function getAllSpecialtyPizzaInfo(
    root,
    { args },
    { Cheese, Meat, Veggie, Pizza, Crust, Sauce }
) {

    return await Pizza.findAll({
        attributes:[],
        where:{
            specialty: true
        },
        include: [Crust, Sauce,
            {
                model: Cheese,
                attributes: ['cheese_type', 'cheese_price']
            },
            {
                model: Meat,
                attributes: ['meat_type', 'meat_price']
            },
            {
                model: Veggie,
                attributes: ['veggie_type', 'veggie_price']
            }
        ]
    }).catch(errHandler);
}

module.exports = getAllSpecialtyPizzaInfo


