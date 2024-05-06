const { MercadoPago } = require("../../db");

const postMP = async function (MPData) {
    const [mp] = await MercadoPago.findOrCreate({
        where: {
            transactionId: MPData.transactionId,
        },
        defaults: MPData,
    });

    return mp;
};

module.exports = postMP;