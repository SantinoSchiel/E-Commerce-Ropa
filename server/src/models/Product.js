const { DataTypes } = require("sequelize");

const product = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Ahora es un array de strings
        allowNull: false
      },
      color: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      adminId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};

module.exports = product;