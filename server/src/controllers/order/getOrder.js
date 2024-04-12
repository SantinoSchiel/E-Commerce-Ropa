const { Order } = require("../../db");

const getOrder = async function () {
  const allOrder = await Order.findAll();
  return allOrder;
};
module.exports = getOrder;
