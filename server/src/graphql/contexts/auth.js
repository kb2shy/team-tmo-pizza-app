const jwt = require('jsonwebtoken');
const config = require('config');

// Authentication context, which extracts the token from request header and
// decrypts to user object (which contains customer_id).
function auth({ req, res }) {
  // Get token from header
  const token = req.header('x-auth-token');

  let user = null;

  // attempt to decrypt token if exists
  if (token) {
    try {
      const decrypted = jwt.verify(token, config.get('authJWTSecret'));
      user = decrypted.customer;
    } catch (err) {
      user = null;
    }
  }

  // return an object containing the user
  return { user };
}

module.exports = auth;
