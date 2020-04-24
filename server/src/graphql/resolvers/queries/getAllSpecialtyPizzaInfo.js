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
        attributes:['pizza_name', 'price'],
        where:{
            specialty: true
        },
        include: [Crust, Sauce,
            {
                model: Cheese,
                attributes: ['cheese_type', 'cheese_price', 'cheese_id']
            },
            {
                model: Meat,
                attributes: ['meat_type', 'meat_price', 'meat_id']
            },
            {
                model: Veggie,
                attributes: ['veggie_type', 'veggie_price', 'veggie_id']
            }
        ]
    }).catch(errHandler);
}

module.exports = getAllSpecialtyPizzaInfo


