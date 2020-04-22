const Sequelize = require('sequelize');

const errHandler = (err) => {
    console.error('Error: ', err);
};

async function getToppingsCountByCustomerId(
    root,
    { customer_id },
    { Order, Cheese, Meat, Veggie, Pizza }
) {
    // let res = await Order.findAll({
    //     attributes: ['customer_id'],
    //     where: {
    //         customer_id: customer_id
    //     }
    // })

    // return await Pizza.findAll({
    //     attributes: ['pizza_id'],

    //     include: [
    //         {
    //             model: Cheese,
    //             attributes: ['cheese_id', [Sequelize.fn('count', Sequelize.col('cheeses.cheese_id')), 'cheese_count']],
    //             //    group: ['cheeses.cheese_id']

    //             through: {
    //                 attributes: []
    //             }

    //         },
    //         {
    //             model: Meat,
    //             attributes: ['meat_id', [Sequelize.fn('count', Sequelize.col('meats.meat_id')), 'meat_count']],
    //             //    group: ['meat_type']
    //             through: {
    //                 attributes: []
    //             }
    //         },
    //         {
    //             model: Veggie,
    //             attributes: ['veggie_id', [Sequelize.fn('count', Sequelize.col('veggies.veggie_id')), 'veggie_count']],
    //            // group: ['veggie_type']
    //             through: {
    //                 attributes: []
    //             }
    //         }
    //     ],
    //     group: ['pizza.pizza_id', 'cheeses.cheese_id', 'meats.meat_id', 'veggies.veggie_id']
    // })

    return await Order.findAll({
        attributes: [],
        through: {
            attributes: {
                include: []
            }
        },
        where: {
            customer_id: customer_id
        },
        include: [
            {
                model: Pizza,
                attributes: [],
                through: {
                    attributes: {
                        include: []
                    }
                },
                include: [
                    {
                        model: Cheese,
                        attributes: ['cheese_id', [Sequelize.fn('count', Sequelize.col('pizzas.cheeses.cheese_id')), 'cheese_count']],
               //         group: ['pizzas.cheeses.cheese_id'],

                        through: {
                            attributes: {
                                exclude: ['pizzas.cheeses.cheeseSelecton.pizza_id']
                            }
                        }

                    },
                    {
                        model: Meat,
                        attributes: ['meat_id', [Sequelize.fn('count', Sequelize.col('pizzas.meats.meat_id')), 'meat_count']],
               //         group: ['pizzas.meats.meat_id'],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Veggie,
                        attributes: ['veggie_id', [Sequelize.fn('count', Sequelize.col('pizzas.veggies.veggie_id')), 'veggie_count']],
                    //    group: ['pizzas.veggies.veggie_id'],
                        through: {
                            attributes: []
                        }
                    }
                ],
            //    group: ['pizzas.orderItem.pizza_id']
               //   group: ['cheeses.cheese_id', 'meats.meat_id', 'veggies.veggie_id']
            }
        ],
        group: [ 'pizzas.cheeses.cheeseSelection.cheese_id', 'pizzas.meats.meatSelection.meat_id', 'pizzas.veggies.veggieSelection.veggie_id', 'pizzas.cheeses.cheese_id', 'pizzas.meats.meat_id', 'pizzas.veggies.veggie_id', 'order.order_id', 'pizzas.orderItem.order_id', 'pizzas.orderItem.pizza_id']
    })
}

module.exports = getToppingsCountByCustomerId


