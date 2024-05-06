const { Admin } = require("../../db");

const putAdmin = async (id, newData) => {
  const AdminSearched = await Admin.findOne({ where: { id: id } });
  if (!AdminSearched) throw new Error("El cliente no existe.");

  const updatedAdmin = await Admin.update(newData, {
    where: {
      id: id
    },
  });

  const updatededAdmin = await Admin.findOne({
    where: {
      id: id
    },
  });

  return updatededAdmin;
};

module.exports = putAdmin;
