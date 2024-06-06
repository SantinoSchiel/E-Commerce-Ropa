const { Purchase } = require("../../db");

const getPurchase = async function () {
  const allPurchase = await Purchase.findAll();
  return allPurchase;
};
module.exports = getPurchase;
