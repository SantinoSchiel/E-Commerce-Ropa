const { DataTypes } = require('sequelize');

const Customer = (sequelize) => {
  sequelize.define('customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });
};

module.exports = Customer;