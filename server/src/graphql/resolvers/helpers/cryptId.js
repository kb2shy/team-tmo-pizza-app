// This is used for encrypting and decrypting order Ids to be represented on a bar-code.
// Encryption is necessary for a security measure against forgery

/**
 * Prepend zeros to number so that in string form, the length is at least totalLength
 * Original Source: https://stackoverflow.com/questions/8513032/less-than-10-add-0-to-number/8513060#8513060
 * @param {number} number
 * @param {number} totalLength
 * @return {string}
 */
function prependZeros(number, totalLength) {
  const padding = +totalLength + 1 - (number + '').length;
  if (padding > 0) {
    return new Array(padding).join('0') + number;
  } else {
    return number.toString();
  }
}

/**
 *
 * @param {number} id
 * @return {string}
 */
function encryptId(id) {
  // @todo utilize crypto
  const code = prependZeros(id.toString('16'), 12);
  return code;
}

/**
 * @param {string} code
 * @return {number} id
 */
function decryptId(code) {
  return parseInt(code, '16');
}

module.exports = { encryptId, decryptId };
