const { DataTypes } = require("sequelize");

const orderDetail = (sequelize) => {
  sequelize.define(
    "orderDetail",
    {
      detailId: {
        types: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      orderId: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
      product_id: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
      quantity: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
      unitPrice: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
    },
    { timestamps: false }
  );
};
