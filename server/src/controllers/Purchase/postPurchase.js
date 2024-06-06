const { Purchase } = require("../../db");

const postPurchase = async function (data) {
    console.log(data, 'data');

    if (!data.paymentId || !data.amount || !data.adminId || !data.customerId) {
        throw new Error('Faltan datos obligatorios para crear la compra');
    }

    const PurchaseExistence = await Purchase.findOne({ where: { paymentId: data.paymentId } });

    if (PurchaseExistence) return { error: 'la compra ya existe' };

    const amount = Number(data.amount);
    console.log(amount);

    console.log('ANTES DE CREAR compra');

    try {
        const newPurchase = await Purchase.create({
            paymentId: data.paymentId,
            amount: amount,
            cart: data.cart,
            adminId: data.adminId,
            customerId: data.customerId
        });

        console.log('DESPUES DE CREla compra', newPurchase);

        return newPurchase;
    } catch (error) {
        console.error('Error al crear la compra:', error);
        throw new Error('Error al crear la compra');
    }
};

module.exports = postPurchase;