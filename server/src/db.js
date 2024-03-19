require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

//!Crear modelos
const CustomerModel = require("./models/customer");
const OrderModel = require("./models/order");

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

const {
  Customer,
  Order
} = sequelize.models;

//!relaciones
Customer.hasMany(Order, { foreignKey: 'customer_id' }); // Esto asocia la columna customer_id en la tabla Order con la tabla Customer.
Order.belongsTo(Customer, { foreignKey: 'customer_id' }); // Esto establece la relación de que cada Order pertenece a un único Customer.


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};