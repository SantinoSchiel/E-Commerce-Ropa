const { Order } = require("../../db");

const postOrder = async function (data) {

    if (!data.date || !data.status || !data.customerId) {
        throw new Error('Faltan datos obligatorios para crear la orden');
    }

    const newOrder = await Order.create({ date: data.date, status: data.status, customerId: data.customerId });

    return newOrder;
};


module.exports = postOrder;