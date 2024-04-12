const { orderDetail } = require("../../db");

const getOrderDetail = async function () {
  const allOrderDetails = await orderDetail.findAll();
  return allOrderDetails;
};
module.exports = getOrderDetail;
