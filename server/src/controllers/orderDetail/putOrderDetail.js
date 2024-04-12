const { orderDetail } = require("../../db");

const putorderDetail = async (id, newData) => {
  const orderDetailSearched = await orderDetail.findOne({ where: { id: id } });
  if (!orderDetailSearched) throw new Error("La orden no existe.");

  const updatedorderDetail = await orderDetail.update(newData, {
    where: {
      id: id
    },
  });

  const updatededorderDetail = await orderDetail.findOne({
    where: {
      id: id
    },
  });

  return updatededorderDetail;
};

module.exports = putorderDetail;
