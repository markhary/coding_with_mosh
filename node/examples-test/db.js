/* eslint-disable func-names */
/* eslint-disable no-console */

module.exports.getCustomerSync = function (id) {
  console.log('Reading a customer from MongoDB...');
  return { id, points: 11 };
};

module.exports.getCustomer = async function (id) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    console.log('Reading a customer from MongoDB...');
    resolve({ id, points: 11 });
  });
};
