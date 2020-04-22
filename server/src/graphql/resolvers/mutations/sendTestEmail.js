const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const sgMail = require('@sendgrid/mail');
const config = require('config');
const JsBarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const createAndFillPizza = require('./createAndFillPizza');
const computePizzasPrice = require('../helpers/computePizzasPrice');
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

let guestConfirmOrderTemplate = null;
let memberConfirmOrderTemplate = null;
// load email templates (do asynchronously to prevent delay)

fs.readFile(guestEmailTemplateFile, 'utf8', function (err, data) {
  if (err) throw err;
  guestConfirmOrderTemplate = Handlebars.compile(data);
});
fs.readFile(memberEmailTemplateFile, 'utf8', function (err, data) {
  if (err) throw err;
  memberConfirmOrderTemplate = Handlebars.compile(data);
});

// This mutation is meant to be as a helper function for
// `createGuestOrder` and `createMemberOrder` mutations.
// Thus mutation must not be shared with the end client.
async function sendTestEmail(root, attrs, context) {
  if (!memberConfirmOrderTemplate || !guestConfirmOrderTemplate) {
    throw 'Email confirmation template(s) not loaded yet. Please try again later.';
  }

  const order_id = 344534;

  // draw bar-code based on order id (we may need to hash that id @todo)
  const canvasInst = createCanvas();
  const orderCode = encryptId(order_id);
  JsBarcode(canvasInst, orderCode, {
    format: 'CODE128',
    displayValue: false,
  });
  // convert to base64-encoded buffer for inline image insertion
  const imgData1 = await canvasInst.toDataURL('image/jpeg');
  // remove declarations for compatibility with SendGrid
  const imgData2 = imgData1.replace('data:image/jpeg;base64,', '');

  // create a formatted email
  let html = memberConfirmOrderTemplate({});

  // store the generated html for sampling purposes
  // fs.writeFile(emailSampleFile, html, (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });

  // send order confirmation email
  const msg = {
    to: 'anton.synytsia@gmail.com',
    from: config.get('supportEmail'),
    subject: 'TMoPizza Order Confirmation',
    html: html,
    attachments: [
      {
        filename: `tmopizza-order-${order_id}.png`,
        type: 'image/png',
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
  return order_id;
}

module.exports = sendTestEmail;
