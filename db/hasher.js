const crypto = require('crypto')

function generateSalt(rounds)
{
  if (rounds >= 15) {
    throw new Error(`${rounds} is greater than 15,Must be less that 15`);
  }
  if (typeof rounds !== 'number') {
    throw new Error('rounds param must be a number');
  }
  if (rounds == null) {
    rounds = 12;
  }
  return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
}

function hasher(password, salt)
{
  if (salt == "")
  {
    salt = generateSalt(12)
  }

  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return {
      salt: salt,
      hashedpassword: value
  }
}

module.exports = {
  hasher
}