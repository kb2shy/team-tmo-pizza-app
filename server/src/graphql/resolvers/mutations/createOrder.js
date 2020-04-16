const sgMail = require('@sendgrid/mail');
const config = require('config');
const createAndFillPizza = require('./createAndFillPizza');

sgMail.setApiKey(config.get('sendGridAPI'));

async function createOrder(
  root,
  { customer, pizzas },
  { Order, OrderItem, ...context }
) {
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

  // send order confirmation email
  const msg = {
    to: customer.email,
    from: config.get('supportEmail'),
    subject: 'Thank You for your TmoPizza Order',
    // text: '',
    html: `
<h3>TmoPizza Order Confirmation</h3>
<p>Thank you for your order, ${customer.first_name} ${customer.last_name}</p>
<p>Your order id is <b>${orderRecord.order_id}</b>.
</p><span>You are receiving this email because an order was made using ${customer.email} address. If you have not made an order with this email, please kindly disregard this message.</span>`,
  };

  sgMail.send(msg).catch((err) => {
    console.log('Failed to send an email with SendGrid:', err);
  }); // no need to await this request

  // return the order
  return orderRecord;
}

module.exports = createOrder;
