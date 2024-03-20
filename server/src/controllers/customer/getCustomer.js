const { Customer } = require("../../db");

const getCustomers = async function () {
  const allCustomers = await Customer.findAll();
  return allCustomers;
};
module.exports = getCustomers;
