const bcrypt = require('bcrypt');

// In addition to creating customers, this is used for updating an
// already-created, non-registered customer. Updating already-created customers
// is needed to allow a guest, whom ordered a pizza, to reuse their email for
// registering later or making an additional order.
// @todo Cases to consider:
// What happens if guest orders with email of a registered customer?
// Should we link the registered customer to the unauthenticated customer? No! Yes for easy fix;
// It is better to encourage the user to sign in by outing a message:
// "Looks like you already have an account. Please sign to make an order"
async function updateOrCreateCustomer(
  root,
  { first_name, last_name, phone, email, password, isRegistered },
  { Customer }
) {
  // process input
  first_name = first_name.trim();
  last_name = last_name.trim();
  phone = phone.trim();
  email = email.trim().toLowerCase();

  // override registered if password is falsy (null, undefined, '')
  let isRegistered2 = isRegistered && password ? true : false;

  // query a customer by the given email
  let existingCustomer = null;
  try {
    existingCustomer = await Customer.findOne({ where: { email } });
  } catch (err) {
    console.log(err);
    return null;
  }

  // In case an attempt is made to register/order pizza as guest
  //   using an email of an existing, registered account.
  if (existingCustomer && existingCustomer.isRegistered) {
    // @todo it is better to return an error (and not just for this case)
    //   and prompt user to sign in
    return null;
  }

  try {
    // generate hash from password
    let passHash = null;
    if (password) {
      passHash = await bcrypt.hash(password, 10);
    }

    if (existingCustomer) {
      return await existingCustomer.update({
        first_name,
        last_name,
        phone,
        password: passHash,
        isRegistered: isRegistered2,
      }); // errHandler not necessary here; see the catch statement below
    } else {
      return await Customer.create({
        first_name,
        last_name,
        phone,
        email,
        password: passHash,
        isRegistered: isRegistered2,
      }); // errHandler not necessary here; see the catch statement below
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = updateOrCreateCustomer;
