const { orderDetail } = require("../../db");

const postOrderDetail = async function (data) {

    if (!data.quantity || !data.unitPrice || !data.orderId || !data.productsList ) {
        throw new Error('Faltan datos obligatorios para crear la orden');
    }

    const newOrderDetail = await orderDetail.create({ quantity: data.quantity, unitPrice: data.unitPrice, orderId: data.orderId, productId: data.productId, productsList: data.productsList });

    return newOrderDetail;
};


module.exports = postOrderDetail;