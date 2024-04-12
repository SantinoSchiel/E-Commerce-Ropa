const { Admin } = require("../../db");

const getAdmin = async function () {
  const allAdmin = await Admin.findAll();
  return allAdmin;
};
module.exports = getAdmin;
