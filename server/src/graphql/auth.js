const jwt = require('jsonwebtoken');

// Better to store this constant in separate JSON file and not commit,
// but for the sake of the demo...
const MY_JWT_SECRET = 'MY_PREFERRED_AUTH_SECRET';

// Middleware
const authContext = ({ req, res }) => {
  // Get token from header
  const token = req.header('x-auth-token');

  let user = null;

  // attempt to decrypt token if exists
  if (token) {
    try {
      const decrypted = jwt.verify(token, MY_JWT_SECRET);
      console.log('DECRYPT', decrypted);
      user = decrypted.customer;
    } catch (err) {
      user = null;
    }
  }

  // return an object containing the user
  return { user };
};

const authGetTokenByCustomer = async (email, password, Customer) => {
  // @todo hash password and compare
  let customer;
  try {
    customer = await Customer.findOne({
      where: {
        email,
        password,
      },
    });
  } catch (err) {
    //console.log(err);
    return null;
  }

  if (!customer) {
    return null;
  }

  const payload = {
    customer: {
      customer_id: customer.customer_id,
    },
  };

  const token = jwt.sign(payload, MY_JWT_SECRET, {
    expiresIn: 3600, // have user be required to resign in after one hour
  });

  return token;
};

module.exports = {
  authContext,
  authGetTokenByCustomer,
};
