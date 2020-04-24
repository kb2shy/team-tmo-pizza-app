const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { AuthenticationError } = require('apollo-server');

// Used for login
async function getTokenByCustomer(root, { email, password }, { Customer }) {
  const customer = await Customer.findOne({
    where: {
      email,
      registered: true, // ensure we're finding the user that is registered
    },
  });

  // throw if no user found
  if (!customer) {
    throw new AuthenticationError('Invalid email or password.');
  }

  // validate password
  const match = await bcrypt.compare(password, customer.password);
  // return null if passwords do not match
  if (!match) {
    throw new AuthenticationError('Invalid email or password.');
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
