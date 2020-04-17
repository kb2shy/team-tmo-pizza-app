const gqlModels = `
  type Crust {
    crust_id: Int
    crust_type: String
  }
  type Cheese {
    cheese_id: Int
    cheese_type: String
    cheese_price: Float
  }
  type Sauce {
    sauce_id: Int
    sauce_type: String
  }
  type Size {
    size_id: Int
    size_type: String
    size_price: Float
  }
  type Meat {
    meat_id: Int
    meat_type: String
    meat_price: Float
  }
  type Veggie {
    veggie_id: Int
    veggie_type: String
    veggie_price: Float
  }
  type Order {
    order_id: Int
    customer_id: Int
    isCompleted: Int
    createdAt: String
  }
  type Customer {
    customer_id: Int
    first_name: String
    last_name: String
    phone: String
    email: String
    password: String
    isRegistered: Boolean
  }
  type Pizza {
    pizza_id: Int
    size_id: Int
    crust_id: Int
    sauce_id: Int
    size: Size
    crust: Crust
    sauce: Sauce
    meats: [Meat] 
    veggies: [Veggie]
    cheeses: [Cheese]
  }
  type MeatSelection {
    meat_id: Int
    pizza_id: Int
    meat: Meat
    pizza: Pizza
  }
  type VeggieSelection {
    veggie_id: Int
    pizza_id: Int
    veggie: Veggie
    pizza: Pizza
  }
  type CheeseSelection {
    cheese_id: Int
    pizza_id: Int
    cheese: Cheese
    pizza: Pizza
  }
  type OrderItem {
    pizza_id: Int
    order_id: Int
    pizza: [Pizza]
    order: Order
  }
`;

module.exports = gqlModels;
