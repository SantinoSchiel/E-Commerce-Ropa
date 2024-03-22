// mercadopago.js
const { DataTypes } = require('sequelize');

const MercadoPago = (sequelize) => {
    sequelize.define('MercadoPago', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
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