const Sequelize = require('sequelize');

const errHandler = (err) => {
    console.error('Error: ', err);
};

async function getToppingsByPizzaId(
    root,
    { pizza_id },
    { Cheese, Meat, Veggie, Pizza }
) {

    return await Pizza.findOne({
        attributes:[],
        where:{
            pizza_id: pizza_id
        },
        include: [
            {
                model: Cheese,
                attributes: ['cheese_type']
            },
            {
                model: Meat,
                attributes: ['meat_type']
            },
            {
                model: Veggie,
                attributes: ['veggie_type']
            }
        ]
    }).catch(errHandler);
}

module.exports = getToppingsByPizzaId


