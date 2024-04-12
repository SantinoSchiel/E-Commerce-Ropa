const { MercadoPago } = require("../../db");

const putMP = async (transactionId, newData) => {
  const MercadoPagoSearched = await MercadoPago.findOne({ where: { transactionId: transactionId } });
  if (!MercadoPagoSearched) throw new Error("El MP no existe.");

  const updatedMercadoPago = await MercadoPago.update(newData, {
    where: {
      transactionId: transactionId
    },
  });

  const updatededMercadoPago = await MercadoPago.findOne({
    where: {
      transactionId: transactionId
    },
  });

  return updatededMercadoPago;
};

module.exports = putMP;
