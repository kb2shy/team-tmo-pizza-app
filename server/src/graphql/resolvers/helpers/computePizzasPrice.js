// Anton (4/22/2020): This utility is no longer used but I left it here just in case.

const { Op } = require('sequelize');

/**
 * A helper function for computing the overall pizzas price efficiently (with quantity).
 * Efficiency comes from querying the used selections only once even if multiple
 * pizzas in the order share a common selection. That said, I believe this is far
 * from being optimized but (I believe) is faster than computing price for each
 * pizza individually (unless the price for each pizza is computed with a single
 * call to db).
 * @param {[object]} pizzasDetails [{pizzaRecord, meat_ids, cheese_ids, veggie_ids }, ...]
 * @param {object} context {Sauce, Size, Crust, Meat, Veggie, Cheese}
 * @return {number} Total price
 */
async function computePizzasPrice(
  pizzasDetails,
  { Sauce, Size, Crust, Meat, Veggie, Cheese }
) {
  // setup an object of maps for computing pizzas price efficiently
  const counts = {
    sizes: new Map(), // { id => quantity }
    crusts: new Map(),
    sauces: new Map(),
    meats: new Map(),
    cheeses: new Map(),
    veggies: new Map(),
  };

  // store the quantities of each pizza selection and topping occurrence in the associated maps
  for (let {
    pizzaRecord: { sauce_id, size_id, crust_id, quantity },
    meat_ids,
    veggie_ids,
    cheese_ids,
  } of pizzasDetails) {
    // sauces
    let c = counts.sauces.get(sauce_id);
    counts.sauces.set(sauce_id, c === undefined ? quantity : c + quantity);
    // sizes
    c = counts.sizes.get(size_id);
    counts.sizes.set(size_id, c === undefined ? quantity : c + quantity);
    // crusts
    c = counts.crusts.get(crust_id);
    counts.crusts.set(crust_id, c === undefined ? quantity : c + quantity);
    // meats
    for (let meat_id of meat_ids) {
      c = counts.meats.get(meat_id);
      counts.meats.set(meat_id, c === undefined ? quantity : c + quantity);
    }
    // veggies
    for (let veggie_id of veggie_ids) {
      c = counts.veggies.get(veggie_id);
      counts.veggies.set(veggie_id, c === undefined ? quantity : c + quantity);
    }
    // cheeses
    for (let cheese_id of cheese_ids) {
      c = counts.cheeses.get(cheese_id);
      counts.cheeses.set(cheese_id, c === undefined ? quantity : c + quantity);
    }
  }

  // query each preferred selection only once and multiply its price by the number of occurrences
  let total_price = 0;

  // TBD: sauces and crusts don't have a price ~ @todo

  // sizes
  if (counts.sizes.size !== 0) {
    const records = await Size.findAll({
      where: {
        size_id: { [Op.in]: Array.from(counts.sizes.keys()) },
      },
    });
    for (let record of records) {
      total_price += record.size_price * counts.sizes.get(record.size_id);
    }
  }

  // meats
  if (counts.meats.size !== 0) {
    const records = await Meat.findAll({
      where: {
        meat_id: { [Op.in]: Array.from(counts.meats.keys()) },
      },
    });
    for (let record of records) {
      total_price += record.meat_price * counts.meats.get(record.meat_id);
    }
  }

  // veggies
  if (counts.veggies.size !== 0) {
    const records = await Veggie.findAll({
      where: {
        veggie_id: { [Op.in]: Array.from(counts.veggies.keys()) },
      },
    });
    for (let record of records) {
      total_price += record.veggie_price * counts.veggies.get(record.veggie_id);
    }
  }

  // cheeses
  if (counts.cheeses.size !== 0) {
    const records = await Cheese.findAll({
      where: {
        cheese_id: { [Op.in]: Array.from(counts.cheeses.keys()) },
      },
    });
    for (let record of records) {
      total_price += record.cheese_price * counts.cheeses.get(record.cheese_id);
    }
  }

  return total_price;
}

module.exports = computePizzasPrice;
