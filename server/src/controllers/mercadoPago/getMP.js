const { MercadoPago } = require("../../db");

const getMP = async function () {
    const allMP = await MercadoPago.findAll();
    return allMP;
};
module.exports = getMP;
