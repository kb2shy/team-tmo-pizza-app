async function createAndFillPizza(
  root,
  { size, crust, sauce, cheese, toppings: { meats, veggies } },
  {
    Cheese,
    Crust,
    Order,
    Pizza,
    Sauce,
    Meat,
    Veggie,
    Size,
    MeatSelect,
    VeggieSelect,
    OrderItem,
  }
) {
  // find size id by type
  const sizeRecord = await Size.findOne({
    where: { size_type: size },
  });
  if (!sizeRecord) {
    throw new Error(`Could not find size id by type ${size}`);
  }
  const size_id = sizeRecord.size_id;

  // find crust id by type
  const crustRecord = await Crust.findOne({
    where: { crust_type: crust },
  });
  if (!crustRecord) {
    throw new Error(`Could not find crust id by type ${crust}`);
  }
  const crust_id = crustRecord.crust_id;

  // find sauce id by type
  const sauceRecord = await Sauce.findOne({
    where: { sauce_type: sauce },
  });
  if (!sauceRecord) {
    throw new Error(`Could not find sauce id by type ${sauce}`);
  }
  const sauce_id = sauceRecord.sauce_id;

  // find cheese id by type
  const cheeseRecord = await Cheese.findOne({
    where: { cheese_type: cheese },
  });
  if (!cheeseRecord) {
    throw new Error(`Could not find cheese id by type ${cheese}`);
  }
  const cheese_id = cheeseRecord.cheese_id;

  // collect meat ids
  const meat_ids = [];
  for (let meat of meats) {
    // find cheese id by type
    const meatRecord = await Meat.findOne({
      where: { meat_type: meat },
    });
    if (!meatRecord) {
      throw new Error(`Could not find meat id by type ${meat}`);
    }
    const meat_id = cheeseRecord.meat_id;
    meat_ids.push(meat_id);
  }

  // collect veggie ids
  const veggie_ids = [];
  for (let veggie of veggies) {
    // find cheese id by type
    const veggieRecord = await Veggie.findOne({
      where: { veggie_type: veggie },
    });
    if (!veggieRecord) {
      throw new Error(`Could not find meat id by type ${veggie}`);
    }
    const veggie_id = veggieRecord.veggie_id;
    veggie_ids.push(veggie_id);
  }

  // create pizza
  const pizzaRecord = await Pizza.create({
    size_id, crust_id, sauce_id, cheese_id
  })

  // add meats to the pizza
  for (let meat_id of meat_ids) {
      await 
  }
}

module.exports = createAndFillPizza;
