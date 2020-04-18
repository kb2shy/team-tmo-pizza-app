const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const sgMail = require('@sendgrid/mail');
const config = require('config');
const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const createAndFillPizza = require('./createAndFillPizza');

sgMail.setApiKey(config.get('sendGridAPI'));

let orderConfirmationTemplate = null;

const emailTemplateFile = path.join(
  __dirname,
  '../../../templates/orderConfirmationEmail.html'
);

const emailSampleFile = path.join(
  __dirname,
  '../../../templates/sampleEmail.html'
);

fs.readFile(emailTemplateFile, 'utf8', function (err, data) {
  if (err) throw err;
  orderConfirmationTemplate = Handlebars.compile(data);
});

// This mutation is meant to be as a helper function for
// `createGuestOrder` and `createMemberOrder` mutations.
// Thus mutation must not be shared with the end client.
async function createOrder(
  root,
  { customer, pizzas },
  { Order, OrderItem, ...context }
) {
  if (!orderConfirmationTemplate) {
    throw 'Email confirmation template not loaded yet. Please try again later';
  }

  // create pizzas
  const pizzasDetails = [];
  for (let pizza of pizzas) {
    try {
      const pizzaDetails = await createAndFillPizza(root, { pizza }, context);
      pizzasDetails.push(pizzaDetails);
    } catch (err) {
      // @todo delete all other created pizzas
      throw `An error ocurred with creating a pizza: ${err}`;
    }
  }

  // create order
  let orderRecord = null;
  try {
    orderRecord = await Order.create({ customer_id: customer.customer_id });
  } catch (err) {
    throw `Error with Order.create: ${err}`;
  }
  // orderRecord is never null here

  // tie pizzas to the order
  for (let pizzaDetails of pizzasDetails) {
    try {
      await OrderItem.create({
        order_id: orderRecord.order_id,
        pizza_id: pizzaDetails.pizzaRecord.pizza_id,
      });
    } catch (err) {
      throw `Error with OrderItem.create: ${err}`;
    }
  }

  // compute price for all pizzas
  const totalPrice = await computePizzasPrice(pizzasDetails, context);

  // draw bar-code based on order id (we may need to hash that id @todo)
  const canvasInst = createCanvas();
  JsBarcode(canvasInst, orderRecord.order_id, {
    format: 'code128',
    displayValue: false,
  });
  // convert to base64-encoded buffer for inline image insertion
  const imgData1 = canvasInst.toDataURL('image/png');
  // remove declarations for compatibility with SendGrid
  const imgData2 = imgData1.replace('data:image/png;base64,', '');

  // create a formatted email
  const html = orderConfirmationTemplate({
    customer: customer.toJSON(),
    order: orderRecord.toJSON(),
    stats: {
      quantity: pizzasDetails.length,
      price: totalPrice.toFixed(2),
    },
  });

  // store the generated html for sampling purposes
  // fs.writeFile(emailSampleFile, html, (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });

  // send order confirmation email
  const msg = {
    to: customer.email,
    from: config.get('supportEmail'),
    subject: 'TMoPizza Order Confirmation',
    html: html,
    attachments: [
      {
        filename: `tmopizza-order-${orderRecord.order_id}.png`,
        type: 'image/png',
        content_id: 'barcode',
        content: imgData2,
        disposition: 'inline',
      },
    ],
  };

  sgMail.send(msg).catch((err) => {
    console.log('Failed to send an email with SendGrid:', err);
  }); // no need to await this request

  // return the order
  return null;
  return orderRecord;
}

/**
 * A helper function for computing pizzas price efficiently
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
    pizzaRecord: { sauce_id, size_id, crust_id },
    meat_ids,
    veggie_ids,
    cheese_ids,
  } of pizzasDetails) {
    // sauces
    let c = counts.sauces.get(sauce_id);
    counts.sauces.set(sauce_id, c === undefined ? 1 : c + 1);
    // sizes
    c = counts.sizes.get(size_id);
    counts.sizes.set(size_id, c === undefined ? 1 : c + 1);
    // crusts
    c = counts.crusts.get(crust_id);
    counts.crusts.set(crust_id, c === undefined ? 1 : c + 1);
    // meats
    for (let meat_id of meat_ids) {
      c = counts.meats.get(meat_id);
      counts.meats.set(meat_id, c === undefined ? 1 : c + 1);
    }
    // veggies
    for (let veggie_id of veggie_ids) {
      c = counts.veggies.get(veggie_id);
      counts.veggies.set(veggie_id, c === undefined ? 1 : c + 1);
    }
    // cheeses
    for (let cheese_id of cheese_ids) {
      c = counts.cheeses.get(cheese_id);
      counts.cheeses.set(cheese_id, c === undefined ? 1 : c + 1);
    }
  }

  // query each preferred selection only once and multiply its price by the number of occurrences
  let total_price = 0;

  // TBD: sauces and crusts don't have a price ~ @todo

  // sizes
  if (counts.sizes.size !== 0) {
    const records = await Size.findAll({
      where: {
        size_id: { [Op.in]:  Array.from(counts.sizes.keys()) },
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

module.exports = createOrder;
