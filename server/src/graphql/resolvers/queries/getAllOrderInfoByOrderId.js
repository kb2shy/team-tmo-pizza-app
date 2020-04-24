const Sequelize = require('sequelize');
const Op = Sequelize.Op; //allows you to query using joins on sequelize'

const errHandler = (err) => {
    console.error('Error: ', err);
};

async function getAllOrderInfoByOrderId(
    root,
    { order_id },
    { Order, Pizza, Size, Crust, Sauce, Cheese, Meat, Veggie, Address, Customer }
) {

    let res =  await Order.findOne({
        where: {
            order_id: order_id,
        },
        include: [Address, Customer,
            {
                model: Pizza,
                attributes: ['pizza_id', 'price', 'quantity'],
                include: [Size, Crust, Sauce,
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
                    }]
            }
        ]
    }).catch(errHandler);
    return res

}

module.exports = getAllOrderInfoByOrderId


