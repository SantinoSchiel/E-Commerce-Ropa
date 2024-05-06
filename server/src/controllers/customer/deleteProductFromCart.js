const { Customer } = require('../../db');

const deleteProductFromCart = async (customerId, productId, action) => {
  try {
    // Busca al cliente por su ID
    const customer = await Customer.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Verifica si el producto está en el carrito
    const cart = customer.cart || {};
    if (!cart.hasOwnProperty(productId)) {
      throw new Error('Product not found in cart');
    }

    // Verifica el valor de action
    if (action === 'reducir') {
      // Si la cantidad del producto es mayor que 1, resta 1
      if (cart[productId] > 1) {
        cart[productId]--;
      } else {
        throw new Error('Cannot reduce quantity, quantity is already 1');
      }
    } else if (action === 'eliminar') {
      // Elimina el producto del carrito
      delete cart[productId];
    } else {
      throw new Error('Invalid action');
    }

    // Actualiza el carrito del cliente en la base de datos
    await Customer.update({ cart }, { where: { id: customer.id } });

    // Retorna el carrito actualizado
    return cart;
  } catch (error) {
    throw error;
  }
};

module.exports = deleteProductFromCart;