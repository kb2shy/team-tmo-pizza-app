const jwt = require('jsonwebtoken');

// Better to store this constant in separate JSON file and not commit,
// but for the sake of the demo...
const MY_JWT_SECRET = 'MY_PREFERRED_AUTH_SECRET';

// Middleware
const authContext = ({ req, res }) => {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log('Token', token);

  let user = null;

  // attempt to decrypt token if exists
  if (token) {
    try {
      const decoded = jwt.verify(token, MY_JWT_SECRET);
      user = decoded.user;
    } catch (err) {
      user = null;
    }
  }

  // return an object containing the user
  return { user };
};

const authGetTokenByCustomer = async (email, password, Customer) => {
  // @todo hash password and compare
  const result = await Customer.findOne({
    where: {
      email,
      password,
    },
  });

  console.log('authGetTokenByCustomer', result);

  const payload = {
    data: result,
  };

  const token = jwt.sign(payload, MY_JWT_SECRET, {
    expiresIn: 3600,
  });

  return token;
};

module.exports = {
  authContext,
  authGetTokenByCustomer,
};
