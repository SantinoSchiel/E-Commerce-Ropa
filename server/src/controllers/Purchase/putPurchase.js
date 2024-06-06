const { Purchase } = require("../../db");

const putPurchase = async (id, newData) => {
  const PurchaseSearched = await Purchase.findOne({ where: { id: id } });
  if (!PurchaseSearched) throw new Error("La compra no existe.");

  const updatedPurchase = await Purchase.update(newData, {
    where: {
      id: id
    },
  });

  const updatededPurchase = await Purchase.findOne({
    where: {
      id: id
    },
  });

  return updatededPurchase;
};

module.exports = putPurchase;