
module.exports = {
    Mutation: {
        async createCheeseOp(root, { cheese_type, cheese_price }, { Cheese }) {
            return await Cheese.create({ cheese_type, cheese_price })
        },
        async createCrustOp(root, { crust_type }, { Crust }) {
            return await Crust.create({ crust_type })
        },
        async createSizeOp(root, { size_type, size_price }, { Size }) {
            return await Size.create({ size_type, size_price })
        },
        async createSauceOp(root, { sauce_type }, { Sauce }) {
            return await Sauce.create({ sauce_type })
        },
        async createVeggieOp(root, { veggie_type, veggie_price }, { Veggie }) {
            return await Veggie.create({ veggie_type, veggie_price })
        },
        async createMeatOp(root, { meat_type, meat_price }, { Meat }) {
            return await Meat.create({ meat_type, meat_price })
        },
        async createCustomer(
            root,
            { first_name, last_name, phone, email, password, isRegistered },
            { Customer }
        ) {
            try {
                return await Customer.create({
                    first_name,
                    last_name,
                    phone,
                    email,
                    password,
                    isRegistered,
                });
            } catch (err) {
                console.log(err);
                return null;
            }
        },
        async createPizza(root, { size_id, crust_id, sauce_id, cheese_id }, { Pizza }) {
            return await Pizza.create({
                size_id, crust_id, sauce_id, cheese_id
            }).catch(error => console.log(error))
        },
        async setVeggieSelection(root, { veggie_id, pizza_id }, { VeggieSelect }) {
            return await VeggieSelect.create({ veggie_id, pizza_id })
        },
        async setMeatSelection(root, { meat_id, pizza_id }, { MeatSelect }) {
            return await MeatSelect.create({ meat_id, pizza_id })
        },
        async setOrderItem(root, { order_id, pizza_id }, { OrderItem }) {
            return await OrderItem.create({ order_id, pizza_id })
        },
        async createOrder(root, { customer_id }, { Order }) {
            return await Order.create({ customer_id })
        }

    }
}
