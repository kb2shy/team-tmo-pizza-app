const Sequelize = require('sequelize');

const errHandler = (err) => {
    console.error('Error: ', err);
};

async function getToppingsCountByCustomerId(
    root,
    { customer_id },
    { Order, Cheese, Meat, Veggie, Pizza, OrderItem }
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
        attributes: [
            'pizzas.cheeses.cheese_id', [Sequelize.fn('count', Sequelize.col('pizzas.cheeses.cheeseSelection.cheese_id')), 'cheese_count'],
            'pizzas.meats.meat_id', [Sequelize.fn('count', Sequelize.col('pizzas.meats.meat_id')), 'meat_count'],
            'pizzas.veggies.veggie_id', [Sequelize.fn('count', Sequelize.col('pizzas.veggies.veggie_id')), 'veggie_count']],
        where: {
            customer_id: customer_id
        },
        include: [
            {
                model: Pizza,
                attributes: [],
                through: {
                    attributes: {
                        exclude: ['pizzas.orderItem.created_at']
                    }
                },
                include: [
                    
                    {
                        model: Cheese,
                        attributes: [],
                        //         group: ['pizzas.cheeses.cheese_id'],

                        // through: {
                        //     attributes: {
                        //         exclude: ['pizzas.cheeses.cheeseSelecton.pizza_id']
                        //     }
                        // }

                    },
                    {
                        model: Meat,
                        attributes: [],
                        //         group: ['pizzas.meats.meat_id'],
                        // through: {
                        //     attributes: []
                        // }
                    },
                    {
                        model: Veggie,
                        attributes: [],
                        //    group: ['pizzas.veggies.veggie_id'],
                        // through: {
                        //     attributes: []
                        // }
                    }
                ],
                //    group: ['pizzas.orderItem.pizza_id']
                //   group: ['cheeses.cheese_id', 'meats.meat_id', 'veggies.veggie_id']
            }
        ],
        through: {
            model: OrderItem,
            attributes: {
                exclude: ['pizzas.orderItem.created_at']
            }
        },
        group: ['pizzas.cheeses.cheese_id',
            'pizzas.meats.meat_id', 'pizzas.veggies.veggie_id']
    })
}

module.exports = getToppingsCountByCustomerId


