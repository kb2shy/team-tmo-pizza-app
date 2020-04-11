const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
      user = decrypted.customer;
    } catch (err) {
      user = null;
    }
  }

  // return an object containing the user
  return { user };
};

const authGetTokenByCustomer = async (email, password, Customer) => {
  let customer;
  try {
    customer = await Customer.findOne({
      where: {
        email,
        isRegistered: true, // ensure we're finding the user that is registered
      },
    });
  } catch (err) {
    //console.log(err);
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

  const token = jwt.sign(payload, MY_JWT_SECRET, {
    expiresIn: 3600, // have user be required to resign in after one hour
  });

  return token;
};

module.exports = {
  authContext,
  authGetTokenByCustomer,
};
