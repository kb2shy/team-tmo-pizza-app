const { Op } = require('sequelize');

/**
 * A helper function for computing and updating pizzas prices efficiently.
 * Efficiency comes from querying the used selections only once even if multiple
 * pizzas in the order share a common selection. That said, I believe this is far
 * from being optimized but (I believe) is faster than computing price for each
 * pizza individually (unless the price for each pizza is computed with a single
 * call to db or via a stored procedure).
 * @note The prices stored in pizzas are quantity independent. This is done to
 *  make it easier fro updating the price if quantity changes.
 * @param {[object]} pizzasDetails `[{pizzaRecord, meat_ids, cheese_ids, veggie_ids }, ...]`
 * @param {object} context `{Sauce, Size, Crust, Meat, Veggie, Cheese}`
 * @param {object} transaction
 * @return {object} An objet with 3 properties.
 *  Just because we query the database for the used selection prices, we also
 *  gather all the used selection type names and for further use.
 *  The returned object has 3 values:
 *  `{overallPrice: number, overallQuantity: number, selections: object}`.
 *  `selections`: `{ sizes: Map, crusts: Map, sauces: Map, meats: Map, cheeses: Map, veggies: Map }`
 *  Each `Map` is `{ id => { price: number, name: string } }`
 */
async function updatePizzasPrices(
  pizzasDetails,
  { Sauce, Size, Crust, Meat, Veggie, Cheese },
  transaction,
) {
  // a map of all selections for all pizza and their prices.
  const selections = {
    sizes: new Map(), // { id => { price, name } }
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
  } of pizzasDetails) {
    // sauces
    selections.sauces.set(sauce_id, 0);
    // crusts
    selections.crusts.set(crust_id, 0);
    // sizes
    selections.sizes.set(size_id, 0);
    // meats
    for (let meat_id of meat_ids) {
      selections.meats.set(meat_id, 0);
    }
    // veggies
    for (let veggie_id of veggie_ids) {
      selections.veggies.set(veggie_id, 0);
    }
    // cheeses
    for (let cheese_id of cheese_ids) {
      selections.cheeses.set(cheese_id, 0);
    }
  }

  // query selections prices and names

  // sizes
  if (selections.sizes.size !== 0) {
    const records = await Size.findAll({
      where: {
        size_id: { [Op.in]: Array.from(selections.sizes.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      selections.sizes.set(record.size_id, {
        price: record.size_price,
        name: record.size_type,
      });
    }
  }

  // crusts (these do not have a price, so we set it to zero)
  if (selections.crusts.size !== 0) {
    const records = await Crust.findAll({
      where: {
        crust_id: { [Op.in]: Array.from(selections.crusts.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      selections.crusts.set(record.crust_id, {
        price: 0.0,
        name: record.crust_type,
      });
    }
  }

  // sauces (these do not have a price, so we set it to zero)
  if (selections.sauces.size !== 0) {
    const records = await Sauce.findAll({
      where: {
        sauce_id: { [Op.in]: Array.from(selections.sauces.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      selections.sauces.set(record.sauce_id, {
        price: 0.0,
        name: record.sauce_type,
      });
    }
  }

  // meats
  if (selections.meats.size !== 0) {
    const records = await Meat.findAll({
      where: {
        meat_id: { [Op.in]: Array.from(selections.meats.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      selections.meats.set(record.meat_id, {
        price: record.meat_price,
        name: record.meat_type,
      });
    }
  }

  // veggies
  if (selections.veggies.size !== 0) {
    const records = await Veggie.findAll({
      where: {
        veggie_id: { [Op.in]: Array.from(selections.veggies.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      selections.veggies.set(record.veggie_id, {
        price: record.veggie_price,
        name: record.veggie_type,
      });
    }
  }

  // cheeses
  if (selections.cheeses.size !== 0) {
    const records = await Cheese.findAll({
      where: {
        cheese_id: { [Op.in]: Array.from(selections.cheeses.keys()) },
      },
    });
    // update prices
    for (let record of records) {
      selections.cheeses.set(record.cheese_id, {
        price: record.cheese_price,
        name: record.cheese_type,
      });
    }
  }

  // compute and update price for each pizza
  let overallPrice = 0;
  let overallQuantity = 0;
  const promises = [];
  for (let { pizzaRecord, meat_ids, veggie_ids, cheese_ids } of pizzasDetails) {
    let price = 0;
    price += selections.sauces.get(pizzaRecord.sauce_id).price;
    price += selections.crusts.get(pizzaRecord.crust_id).price;
    price += selections.sizes.get(pizzaRecord.size_id).price;
    for (let meat_id of meat_ids) {
      price += selections.meats.get(meat_id).price;
    }
    for (let veggie_id of veggie_ids) {
      price += selections.veggies.get(veggie_id).price;
    }
    for (let cheese_id of cheese_ids) {
      price += selections.cheeses.get(cheese_id).price;
    }
    overallQuantity += pizzaRecord.quantity;
    overallPrice += price * pizzaRecord.quantity;
    const pr = pizzaRecord.update({ price }, { transaction });
    // await pr;
    promises.push(pr);
  }
  await Promise.all(promises);

  // return useful info
  return { overallPrice, overallQuantity, selections };
}

module.exports = updatePizzasPrices;
