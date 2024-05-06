const deleteProductFromCart = require('../../controllers/customer/deleteProductFromCart');

const deleteCartCustomerHandler = async (req, res) => {
  try {
    const { customerId, productId } = req.params;
    const action = req.query.action;
    console.log(action, 'action EN BACKEND');
    // Llama al controlador para eliminar o decrementar la cantidad del producto en el carrito
    const updatedCart = await deleteProductFromCart(customerId, productId, action);
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = deleteCartCustomerHandler;