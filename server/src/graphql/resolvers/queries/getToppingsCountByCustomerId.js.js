const Sequelize = require('sequelize');

const errHandler = (err) => {
    console.error('Error: ', err);
};

async function getToppingsCountByCustomerId(
    root,
    { customer_id },
    { Order, Cheese, Meat, Veggie, Pizza }
) {
    return await Order.findAll({
        where:{
            customer_id: customer_id
        },
        include: [
            {
                model: Pizza,
                attributes: ['pizza_id'],
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
                    }]
            }
        ]
    })
}

module.exports = getToppingsCountByCustomerId


