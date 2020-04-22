const { Op } = require('sequelize');

/**
 * A helper function for computing and updating pizzas prices efficiently.
 * If multiple pizzas in an order use a particular selection,
 * we query the selection's price only once -- that's the efficiency of this.
 * @note The prices stored in pizzas are quantity independent. This is done to
 *  make it easier updating the price if quantity changes.
 * @param {[object]} pizzasDetails [{pizzaRecord, meat_ids, cheese_ids, veggie_ids }, ...]
 * @param {object} context {Sauce, Size, Crust, Meat, Veggie, Cheese}
 * @return {number} An overall price with quantity included
 */
async function updatePizzasPrices(
  pizzasDetails,
  { Sauce, Size, Crust, Meat, Veggie, Cheese }
) {
  // a map of all selections for all pizza and their prices.
  const prices = {
    sizes: new Map(), // { id => price }
    crusts: new Map(),
    sauces: new Map(),
    meats: new Map(),
    cheeses: new Map(),
    veggies: new Map(),
  };

  // gather all selections
  for (let {
    pizzaRecord: { sauce_id, size_id, crust_id },
    meat_ids,
    veggie_ids,
    cheese_ids,
  } of pizzaInputs) {
    // sauces
    prices.sauces.set(sauce_id, 0);
    // crusts
    prices.crusts.set(crust_id, 0);
    // sizes
    prices.sizes.set(size_id, 0);
    // meats
    for (let meat_id of meat_ids) {
      prices.meats.set(meat_id, 0);
    }
    // veggies
    for (let veggie_id of veggie_ids) {
      prices.meats.set(veggie_id, 0);
    }
    // cheeses
    for (let cheese_id of cheese_ids) {
      prices.cheeses.set(cheese_id, 0);
    }
  }

  // query selection prices

  // TBD: sauces and crusts don't have a price ~ @todo

  // sizes
  if (prices.sizes.size !== 0) {
    const records = await Size.findAll({
      where: {
        size_id: { [Op.in]: Array.from(prices.sizes.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      prices.sizes.set(record.size_id, record.size_price);
    }
  }

  // meats
  if (prices.meats.size !== 0) {
    const records = await Meat.findAll({
      where: {
        meat_id: { [Op.in]: Array.from(prices.meats.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      prices.meats.set(record.meat_id, record.meat_price);
    }
  }

  // veggies
  if (prices.veggies.size !== 0) {
    const records = await Veggie.findAll({
      where: {
        veggie_id: { [Op.in]: Array.from(prices.veggies.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      prices.veggies.set(record.veggie_id, record.veggie_price);
    }
  }

  // cheeses
  if (prices.cheeses.size !== 0) {
    const records = await Cheese.findAll({
      where: {
        cheese_id: { [Op.in]: Array.from(prices.cheeses.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      prices.cheeses.set(record.cheese_id, record.cheese_price);
    }
  }

  // compute and update price for each pizza
  let overallPrice = 0;
  const promises = [];
  for (let { pizzaRecord, meat_ids, veggie_ids, cheese_ids } of pizzasDetails) {
    let price = 0;
    price += prices.sauces.get(pizzaRecord.sauce_id);
    price += prices.crusts.get(pizzaRecord.crust_id);
    price += prices.sizes.get(pizzaRecord.size_id);
    for (let meat_id of meat_ids) {
      price += prices.meats.get(meat_id);
    }
    for (let veggie_id of veggie_ids) {
      price += prices.veggies.get(veggie_id);
    }
    for (let cheese_id of cheese_ids) {
      price += prices.cheeses.get(cheese_id);
    }
    overallPrice += price * pizzaRecord.quantity;
    promises.push(pizzaRecord.update({ price }));
  }
  await Promise.all(promises);

  return overallPrice;
}

module.exports = updatePizzasPrices;
