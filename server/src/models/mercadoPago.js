// mercadopago.js
const { DataTypes } = require('sequelize');

const MercadoPago = (sequelize) => {
    sequelize.define('MercadoPago', {
        transactionId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { timestamps: false });
};

module.exports = MercadoPago;