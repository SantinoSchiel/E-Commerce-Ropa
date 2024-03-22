const { Product } = require("../../db");

const getProducts = async function () {
  const allProducts = await Product.findAll();
  return allProducts;
};
module.exports = getProducts;
