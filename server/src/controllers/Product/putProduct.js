const { Product } = require("../../db");

const putProduct = async (id, newData) => {
  const ProductSearched = await Product.findOne({ where: { id: id } });
  if (!ProductSearched) throw new Error("El cliente no existe.");

  const updatedProduct = await Product.update(newData, {
    where: {
      id: id
    },
  });

  const updatededProduct = await Product.findOne({
    where: {
      id: id
    },
  });

  return updatededProduct;
};

module.exports = putProduct;
