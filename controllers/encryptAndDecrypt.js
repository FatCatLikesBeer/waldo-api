const crypto = require('crypto');
const key = Buffer.from(process.env.cryptoKey, 'base64')
const iv = Buffer.from(process.env.cryptoIV, 'base64')

exports.encrypt = (data) => {
  const stringifyedData = JSON.stringify(data)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedData = cipher.update(stringifyedData, 'utf8', 'base64');
  encryptedData += cipher.final('base64');
  return encryptedData;
};

exports.decrypt = (encryptedData) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
  decryptedData += decipher.final('utf8');
  const objectifiedData = JSON.parse(decryptedData);
  return objectifiedData;
};

