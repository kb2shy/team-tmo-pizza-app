const { Op } = require('sequelize');

/**
 * A helper function for computing and updating pizzas prices efficiently.
 * If multiple pizzas in an order use a particular selection,
 * we query the selection's price only once -- that's the efficiency of this.
 * @note The prices stored in pizzas are quantity independent. This is done to
 *  make it easier updating the price if quantity changes.
 * @param {[object]} pizzasDetails [{pizzaRecord, meat_ids, cheese_ids, veggie_ids }, ...]
 * @param {object} context {Sauce, Size, Crust, Meat, Veggie, Cheese}
 * @return {[number, object]} An overall price with quantity included.
 *  Just because we query the database for the used selections, we also
 *  gather all the used selection prices and names and return them for
 *  further use. The returned array has two values:
 *  [overallPrice: number, selections: object].
 *  selections is { sizes: Map, crusts: Map, sauces: Map, meats: Map, cheeses: Map, veggies: Map }
 *  The Map is { id => { price: number, name: string } }
 */
async function updatePizzasPrices(
  pizzasDetails,
  { Sauce, Size, Crust, Meat, Veggie, Cheese }
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
  } of pizzaInputs) {
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
      selections.meats.set(veggie_id, 0);
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
    overallPrice += price * pizzaRecord.quantity;
    promises.push(pizzaRecord.update({ price }));
  }
  await Promise.all(promises);

  // return the overall price
  return [overallPrice, selections];
}

module.exports = updatePizzasPrices;
