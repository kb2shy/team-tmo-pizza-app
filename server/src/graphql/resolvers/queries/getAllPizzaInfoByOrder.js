const Sequelize = require('sequelize');
const Op = Sequelize.Op; //allows you to query using joins on sequelize'

const errHandler = (err) => {
    console.error('Error: ', err);
};

async function getAllPizzaInfoByOrder(
    root,
    { order_id },
    { Order, OrderItem, Pizza, Size, Crust, Sauce, Cheese, Meat, Veggie }
) {
    const res = await OrderItem.findAll({
        attributes: ['pizza_id'],
        where: {
            order_id: order_id,
        },
        include: [Order],
    }).catch(errHandler);

    const ids = Object.values(res).map((id) => {

        return parseInt(id.pizza_id);
    });

    return await Pizza.findAll({
        where: {
            pizza_id: {
                [Op.in]: ids,
            }
        },
        include: [Size, Crust, Sauce,
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
    })
}

module.exports = getAllPizzaInfoByOrder


