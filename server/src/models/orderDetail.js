const { DataTypes } = require("sequelize");

const orderDetail = (sequelize) => {
  sequelize.define(
    "orderDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};

module.exports = orderDetail;