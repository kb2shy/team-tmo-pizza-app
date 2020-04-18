// var crypto = require('crypto');
// var name = 'braits2342342432433333333333333333333333ch';
// var hash = crypto.createHash('md5').update(name).digest('hex');
// console.log(hash); // 9b74c9897bac770ffc029102a200c5de

// let id = 1;
// console.log(crypto.createHash('md5').update(id.toString()).digest('hex'))
// console.log(crypto.createHash('md5').update(id.toString()).digest('hex'))
// console.log(crypto.createHash('md5').update(id.toString()).digest('hex'))
// console.log(crypto.createHash('md5').update(id.toString()).digest('hex'))

// var crypto = require('crypto');

// var iv = crypto.randomBytes(12);

// var mykey = crypto.createCipheriv('aes-128-cbc', 'mypassword', iv);
// var mystr = mykey.update('abc', 'utf8', 'hex')
// mystr += mykey.final('hex');

// console.log(mystr);

/**
 * Prepend zeros to number so that in string form, the length is at least totalLength
 * @param {number} number
 * @param {number} totalLength
 * @return {string}
 */
function padWithZeros(number, totalLength) {
  return (
    new Array(totalLength).join('0').slice((totalLength || 2) * -1) + number
  );
}

// src: https://stackoverflow.com/questions/8513032/less-than-10-add-0-to-number/8513060#8513060
var prependZeros = function (number, width) {
  const padding = +width + 1 - (number + '').length;
  if (padding > 0) {
    return new Array(padding).join('0') + number;
  } else {
    return number.toString();
  }
};

const id = 123122323233123;

const orderCode = prependZeros(id.toString('16'), 12);
console.log(orderCode);
const did = parseInt(orderCode, '16');
console.log(did);
console.log(did === id);

// const crypto = require('crypto');

// const key = '61701511351c7ddbfcaca032';
// const nonce = crypto.randomBytes(12);

// const aad = Buffer.from('0123456789', 'hex');

// const cipher = crypto.createCipheriv('aes-192-ccm', key, nonce, {
//   authTagLength: 16
// });
// const plaintext = '00033';
// cipher.setAAD(aad, {
//   plaintextLength: Buffer.byteLength(plaintext)
// });
// const ciphertext = cipher.update(plaintext, 'utf8');
// cipher.final();
// const tag = cipher.getAuthTag();

// console.log(ciphertext.toString('hex'))

// // Now transmit { ciphertext, nonce, tag }.

// const decipher = crypto.createDecipheriv('aes-192-ccm', key, nonce, {
//   authTagLength: 16
// });
// decipher.setAuthTag(tag);
// decipher.setAAD(aad, {
//   plaintextLength: ciphertext.length
// });
// const receivedPlaintext = decipher.update(ciphertext, null, 'utf8');

// try {
//   decipher.final();
// } catch (err) {
//   console.error('Authentication failed!');
//   return;
// }

// console.log(receivedPlaintext);
