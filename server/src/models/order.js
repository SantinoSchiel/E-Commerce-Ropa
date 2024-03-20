const { DataTypes } = require('sequelize');

const Order = (sequelize) => {
  sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: false
    }
  }, { timestamps: false });
};

module.exports = Order;