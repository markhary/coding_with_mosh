/* eslint-disable no-console */
const bcrypt = require('bcrypt');

// Have to salt to make the hashes random
// 1234 -> abcd

async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('1234', salt);

  console.log(salt);
  console.log(hashed);
}

run();
