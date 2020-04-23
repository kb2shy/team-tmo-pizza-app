const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const sgMail = require('@sendgrid/mail');
const config = require('config');
const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const createAndFillPizza = require('./createAndFillPizza');
const updatePizzasPrices = require('../helpers/updatePizzasPrices');
const { encryptId, decryptId } = require('../helpers/cryptId');

sgMail.setApiKey(config.get('sendGridAPI'));

const guestEmailTemplateFile = path.join(
  __dirname,
  '../../../templates/guest/orderConfirmationEmail.html'
);

const memberEmailTemplateFile = path.join(
  __dirname,
  '../../../templates/member/orderConfirmationEmail.html'
);

const emailSampleFile = path.join(
  __dirname,
  '../../../templates/sampleEmail.html'
);

// load email templates (do asynchronously to prevent delay)
let guestConfirmOrderTemplate = null;
let memberConfirmOrderTemplate = null;
fs.readFile(guestEmailTemplateFile, 'utf8', function (err, data) {
  if (err) throw err;
  guestConfirmOrderTemplate = Handlebars.compile(data);
});
fs.readFile(memberEmailTemplateFile, 'utf8', function (err, data) {
  if (err) throw err;
  memberConfirmOrderTemplate = Handlebars.compile(data);
});

// Create some email template formatting functions
Handlebars.registerHelper('format_price', function (num) {
  return '$' + num.toFixed(2);
});
Handlebars.registerHelper('format_array', function (ary) {
  return ary.join(', ');
});

// This mutation is meant to be as a helper function for
// `createGuestOrder` and `createMemberOrder` mutations.
// Thus mutation must not be shared with the end client.
async function createOrder(
  root,
  { customer, pizzas },
  { Order, OrderItem, ...context }
) {
  if (!memberConfirmOrderTemplate || !guestConfirmOrderTemplate) {
    throw 'Email confirmation template(s) not loaded yet. Please try again later.';
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

  // compute and update pizzas prices; get overall price and used selection prices and names
  const {
    overallPrice,
    overallQuantity,
    selections,
  } = await updatePizzasPrices(pizzasDetails, context);

  // create order
  let orderRecord = null;
  //hardcoded address and delivery is temporary variable until we implement selecting a store location
  try {
    orderRecord = await Order.create({
      customer_id: customer.customer_id,
      delivery: false,
      address_id: 1,
    });
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

  // draw bar-code based on order id (we may need to hash that id @todo)
  const canvasInst = createCanvas();
  const orderCode = encryptId(orderRecord.order_id);
  JsBarcode(canvasInst, orderCode, {
    format: 'CODE128',
    displayValue: false,
  });
  // convert to base64-encoded buffer for inline image insertion
  const imgData1 = await canvasInst.toDataURL('image/jpeg');
  // remove declarations for compatibility with SendGrid
  const imgData2 = imgData1.replace('data:image/jpeg;base64,', '');

  // create an array of pizzas order details, represented in user-friendly way
  const formattedPizzas = [];
  let count = 1;
  for (let {
    pizzaRecord: { sauce_id, size_id, crust_id, quantity },
    meat_ids,
    veggie_ids,
    cheese_ids,
  } of pizzasDetails) {
    // get size, sauce, and crust prices and names
    const size_dat = selections.sizes.get(size_id);
    const sauce_dat = selections.sauces.get(sauce_id);
    const crust_dat = selections.crusts.get(crust_id);

    // get meat names and total price
    const meats = [];
    let meats_price = 0;
    for (let meat_id of meat_ids) {
      const meat_dat = selections.meats.get(meat_id);
      meats.push(meat_dat.name);
      meats_price += meat_dat.price;
    }

    // get veggie names and total price
    const veggies = [];
    let veggies_price = 0;
    for (let veggie_id of veggie_ids) {
      const veggie_dat = selections.veggies.get(veggie_id);
      veggies.push(veggie_dat.name);
      veggies_price += veggie_dat.price;
    }

    // get cheese names and total price
    const cheeses = [];
    let cheeses_price = 0;
    for (let cheese_id of cheese_ids) {
      const cheese_dat = selections.cheeses.get(cheese_id);
      cheeses.push(cheese_dat.name);
      cheeses_price += cheese_dat.price;
    }

    formattedPizzas.push({
      size: size_dat.name,
      sauce: sauce_dat.name,
      crust: crust_dat.name,
      size_price: size_dat.price,
      sauce_price: sauce_dat.price,
      crust_price: crust_dat.price,
      meats_price,
      meats,
      cheeses_price,
      cheeses,
      veggies_price,
      veggies,
      total:
        size_dat.price +
        sauce_dat.price +
        crust_dat.price +
        meats_price +
        cheeses_price +
        veggies_price,
      quantity,
      number: count,
    });
    ++count;
  }

  // create a formatted email
  let html = null;
  if (customer.registered) {
    html = memberConfirmOrderTemplate({
      customer: customer.toJSON(),
      order: orderRecord.toJSON(),
      pizzas: formattedPizzas,
      stats: {
        quantity: overallQuantity,
        price: overallPrice,
      },
    });
  } else {
    html = guestConfirmOrderTemplate({
      customer: customer.toJSON(),
      order: orderRecord.toJSON(),
      pizzas: formattedPizzas,
      stats: {
        quantity: overallQuantity,
        price: overallPrice,
      },
    });
  }

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
        filename: `tmopizza-order-${orderRecord.order_id}.jpeg`,
        type: 'image/jpeg',
        content_id: 'barcode',
        content: imgData2,
        disposition: 'inline',
      },
    ],
  };

  sgMail.send(msg).catch((err) => {
    // @todo handle the situation for/if the :to email does not exist
    console.log('Failed to send an email with SendGrid:', err);
  }); // no need to await this request

  // return the order
  return orderRecord;
}

module.exports = createOrder;
