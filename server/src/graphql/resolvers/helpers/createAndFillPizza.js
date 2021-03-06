/**
 * This is a helper function for the createOrder function, used by
 * `createGuestOrder` and `createMemberOrder` mutations.
 * @param {object} pizza
 * @param {object} context
 * @param {*} transaction
 * @return {object} `{ pizzaRecord: Pizza, meat_ids: [Int], cheese_ids: [Int], veggie_ids: [Int] }`
 */
async function createAndFillPizza(
  { size, crust, sauce, toppings, quantity },
  {
    Pizza,
    // Cheese,
    // Crust,
    // Sauce,
    // Meat,
    // Veggie,
    // Size,
    MeatSelection,
    VeggieSelection,
    CheeseSelection,
  },
  transaction
) {
  // find size id by type
  // let size_id = null;
  // if (size) {
  //   const sizeRecord = await Size.findOne({
  //     where: { size_type: size },
  //   });
  //   if (!sizeRecord) {
  //     throw new Error(`Could not find size id by type ${size}`);
  //   }
  //   size_id = sizeRecord.size_id;
  // }

  // find crust id by type
  // let crust_id = null;
  // if (crust) {
  //   const crustRecord = await Crust.findOne({
  //     where: { crust_type: crust },
  //   });
  //   if (!crustRecord) {
  //     throw new Error(`Could not find crust id by type ${crust}`);
  //   }
  //   crust_id = crustRecord.crust_id;
  // }

  // find sauce id by type
  // let sauce_id = null;
  // if (sauce) {
  //   const sauceRecord = await Sauce.findOne({
  //     where: { sauce_type: sauce },
  //   });
  //   if (!sauceRecord) {
  //     throw new Error(`Could not find sauce id by type ${sauce}`);
  //   }
  //   sauce_id = sauceRecord.sauce_id;
  // }

  // collect meats, cheeses, and veggies
  // const meat_ids = [];
  // const veggie_ids = [];
  // const cheese_ids = [];

  // if (toppings) {
  //   // collect meat ids
  //   if (toppings.meats) {
  //     for (let meat of toppings.meats) {
  //       // find cheese id by type
  //       const meatRecord = await Meat.findOne({
  //         where: { meat_type: meat },
  //       });
  //       if (!meatRecord) {
  //         throw new Error(`Could not find meat id by type ${meat}`);
  //       }
  //       const meat_id = meatRecord.meat_id;
  //       meat_ids.push(meat_id);
  //     }
  //   }

  //   // collect veggie ids
  //   if (toppings.veggies) {
  //     for (let veggie of toppings.veggies) {
  //       // find cheese id by type
  //       const veggieRecord = await Veggie.findOne({
  //         where: { veggie_type: veggie },
  //       });
  //       if (!veggieRecord) {
  //         throw new Error(`Could not find meat id by type ${veggie}`);
  //       }
  //       const veggie_id = veggieRecord.veggie_id;
  //       veggie_ids.push(veggie_id);
  //     }
  //   }

  //   // collect cheese ids
  //   if (toppings.cheeses) {
  //     for (let cheese of toppings.cheeses) {
  //       // find cheese id by type
  //       const cheeseRecord = await Cheese.findOne({
  //         where: { cheese_type: cheese },
  //       });
  //       if (!cheeseRecord) {
  //         throw new Error(`Could not find cheese id by type ${cheese}`);
  //       }
  //       const cheese_id = cheeseRecord.cheese_id;
  //       cheese_ids.push(cheese_id);
  //     }
  //   }
  // }

  const size_id = size;
  const crust_id = crust;
  const sauce_id = sauce;
  const meat_ids = toppings && toppings.meats ? toppings.meats : [];
  const veggie_ids = toppings && toppings.veggies ? toppings.veggies : [];
  const cheese_ids = toppings && toppings.cheeses ? toppings.cheeses : [];

  // create pizza
  const pizzaRecord = await Pizza.create(
    {
      size_id,
      crust_id,
      sauce_id,
      quantity,
      price: 0.0, // price is updated in `updatePizzasPrices`.
      // Anton's explanation:
      // We don't compute price upon creation because if an attribute is null,
      // like `size_id`, we won't know the default selections until after the
      // pizza is created. Although, I believe we can still ask sequelize to give
      // us the defaults beforehand, so that we are able to compute price prior to
      // creating the Pizza; therefore, marking this as @todo for optimization.
    },
    { transaction }
  );
  const pizza_id = pizzaRecord.pizza_id;

  // add meats to the pizza
  for (let meat_id of meat_ids) {
    await MeatSelection.create({ meat_id, pizza_id }, { transaction });
  }

  // add veggies to the pizza
  for (let veggie_id of veggie_ids) {
    await VeggieSelection.create({ veggie_id, pizza_id }, { transaction });
  }

  // add cheeses to the pizza
  for (let cheese_id of cheese_ids) {
    await CheeseSelection.create({ cheese_id, pizza_id }, { transaction });
  }

  // return the pizza record along with meat ids, cheese ids, and veggie ids.
  return { pizzaRecord, meat_ids, cheese_ids, veggie_ids };
}

module.exports = createAndFillPizza;
