require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

//!Crear modelos
const CustomerModel = require("./models/customer");
const OrderModel = require("./models/order");
const orderDetailModel = require("./models/orderDetail");
const productModel = require("./models/product");
const mercadoPagoModel = require("./models/mercadoPago");
const adminModel = require("./models/admin");

const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  {
    logging: false,
    native: false,
  }
);
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
OrderModel(sequelize);
orderDetailModel(sequelize);
productModel(sequelize);
mercadoPagoModel(sequelize);
adminModel(sequelize);

const { Customer, Order, orderDetail, Product, MercadoPago, Admin } = sequelize.models;

//!relaciones
Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });

Order.hasMany(orderDetail);
orderDetail.belongsTo(Order);

orderDetail.belongsToMany(Product, { through: 'OrderDetailProduct' });
Product.belongsToMany(orderDetail, { through: 'OrderDetailProduct' });

MercadoPago.belongsTo(Order);
Order.hasOne(MercadoPago);

Admin.hasMany(Product, { foreignKey: 'adminId' });
Product.belongsTo(Admin, { foreignKey: 'adminId' });

Admin.hasMany(Customer, { foreignKey: 'adminId' });
Customer.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
