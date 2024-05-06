const { Customer } = require("../../db");

const putCustomerCart = async (id, newData) => {
  // Busca el cliente en la base de datos
  const customer = await Customer.findOne({ where: { id } });
  if (!customer) throw new Error("El cliente no existe.");

  // Obtén el carrito del cliente
  let cart = customer.cart || {}; // Si el carrito está vacío, crea un objeto vacío

  // Itera sobre los nuevos datos (id de productos) para agregarlos al carrito
  for (const productId of Object.keys(newData)) {
    // Convertir la cantidad del producto a Number
    let quantity = Number(newData[productId]);

    // Si el valor convertido no es un número válido, establece la cantidad en 1
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }

    // Si el producto ya está en el carrito, aumenta su cantidad
    if (cart[productId]) {
      cart[productId] += quantity;
    } else {
      // Si el producto no está en el carrito, agrégalo con su cantidad
      cart[productId] = quantity;
    }
  }

  // Actualiza el carrito del cliente en la base de datos
  await Customer.update({ cart }, { where: { id } });

  // Devuelve el cliente actualizado con el carrito
  const updatedCustomer = await Customer.findOne({ where: { id } });
  return updatedCustomer;
};

module.exports = putCustomerCart;