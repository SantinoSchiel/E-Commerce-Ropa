require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_RENDER, DB_LOCAL } = process.env;

//!Crear modelos
const CustomerModel = require("./models/customer");
const productModel = require("./models/Product");
const adminModel = require("./models/admin");
const PurchaseModel = require("./models/Purchase");

const sequelize = new Sequelize(DB_LOCAL, {
  // logging: false,
  // native: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
  logging: false, native: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//!Pasar modelos por sequelize
CustomerModel(sequelize);
productModel(sequelize);
adminModel(sequelize);
PurchaseModel(sequelize);

const { Customer, Product, Admin, Purchase } = sequelize.models;

//!relaciones
Customer.hasMany(Purchase, { foreignKey: "customerId" });
Purchase.belongsTo(Customer, { foreignKey: "customerId" });

Admin.hasMany(Purchase, { foreignKey: "adminId" });
Purchase.belongsTo(Admin, { foreignKey: "adminId" });

Purchase.belongsToMany(Product, { through: 'OrderDetailProduct' });
Product.belongsToMany(Purchase, { through: 'OrderDetailProduct' });

Admin.hasMany(Product, { foreignKey: 'adminId' });
Product.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
