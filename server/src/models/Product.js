const { DataTypes } = require("sequelize");

const product = (sequelize) => {
  sequelize.define(
    "product",
    {
      product_id: {
        types: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        types: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
      price: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
      size: {
        types: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
      },
      color: {
        types: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
      description: {
        types: DataTypes.STRING,
        allowNull: false,
        primaryKey: false,
      },
    },
    { timestamps: false }
  );
};
