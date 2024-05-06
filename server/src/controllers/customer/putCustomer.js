const { Customer } = require("../../db");

const putCustomer = async (id, newData) => {
  const CustomerSearched = await Customer.findOne({ where: { id: id } });
  if (!CustomerSearched) throw new Error("El cliente no existe.");

  const updatedCustomer = await Customer.update(newData, {
    where: {
      id: id
    },
  });

  const updatededCustomer = await Customer.findOne({
    where: {
      id: id
    },
  });

  return updatededCustomer;
};

module.exports = putCustomer;
