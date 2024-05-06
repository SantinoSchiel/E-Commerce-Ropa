const { Order } = require("../../db");

const putOrder = async (id, newData) => {
  const OrderSearched = await Order.findOne({ where: { id: id } });
  if (!OrderSearched) throw new Error("La orden no existe.");

  const updatedOrder = await Order.update(newData, {
    where: {
      id: id
    },
  });

  const updatededOrder = await Order.findOne({
    where: {
      id: id
    },
  });

  return updatededOrder;
};

module.exports = putOrder;
