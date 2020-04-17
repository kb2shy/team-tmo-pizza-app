const fs = require('fs');
const handlebars = require('handlebars');
const sgMail = require('@sendgrid/mail');
const config = require('config');
const createAndFillPizza = require('./createAndFillPizza');

sgMail.setApiKey(config.get('sendGridAPI'));

let orderConfirmationTemplate = null;
fs.readFile('../../../templates/orderConfirmationEmail.html', 'utf8', function (
  err,
  data
) {
  if (err) throw err;
  orderConfirmationTemplate = data;
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
    console.log('Email confirmation template not loaded yet. Please try again later');
    return null;
  }

  // create pizzas
  const pizzaRecords = [];
  for (let pizza of pizzas) {
    try {
      const pizzaRecord = await createAndFillPizza(root, { pizza }, context);
      pizzaRecords.push(pizzaRecord);
    } catch (err) {
      console.log('An error ocurred with creating a pizza:', err);
      return null; // @todo delete all other created pizzas
    }
  }

  // create order
  let orderRecord = null;
  try {
    orderRecord = await Order.create({ customer_id: customer.customer_id });
  } catch (err) {
    console.log('Error with Order.create:', err);
    return null; // @todo return error object
  }
  // orderRecord is never null here

  // tie pizzas to the order
  for (let pizzaRecord of pizzaRecords) {
    try {
      await OrderItem.create({
        order_id: orderRecord.order_id,
        pizza_id: pizzaRecord.pizza_id,
      });
    } catch (err) {
      console.log('Error with OrderItem.create:', err);
      return null;
    }
  }

  // create a formatted email
  orderConfirmationTemplate;

  // send order confirmation email
  const msg = {
    to: customer.email,
    from: config.get('supportEmail'),
    subject: 'Thank You for your TmoPizza Order',
    // text: '',
    html: htmlContent,
  };

  sgMail.send(msg).catch((err) => {
    console.log('Failed to send an email with SendGrid:', err);
  }); // no need to await this request

  // return the order
  return orderRecord;
}

module.exports = createOrder;
