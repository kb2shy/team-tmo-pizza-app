const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

// Used for login
async function getTokenByCustomer(root, { email, password }, { Customer }) {
  let customer;
  try {
    customer = await Customer.findOne({
      where: {
        email,
        isRegistered: true, // ensure we're finding the user that is registered
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }

  // return null if no user found
  if (!customer) {
    return null;
  }

  try {
    // validate password
    const match = await bcrypt.compare(password, customer.password);
    // return null if passwords do not match
    if (!match) {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }

  // create token based on customer_id
  const payload = {
    customer: {
      customer_id: customer.customer_id,
    },
  };

  const token = jwt.sign(payload, config.get('authJWTSecret'), {
    expiresIn: 3600, // have user be required to resign in after one hour
  });

  return token;
}

module.exports = getTokenByCustomer;
