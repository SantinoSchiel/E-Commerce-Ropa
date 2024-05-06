const deleteFavoritesCustomer = require("../../controllers/customer/deleteFavoritesCustomer");

const deleteFavoritesCustomerHandler = async (req, res) => {
  try {
    const { customerId, productId } = req.params;

    // Llama al controlador para eliminar el producto de los favoritos del cliente
    const updatedFavorites = await deleteFavoritesCustomer(customerId, productId);
    
    res.status(200).json(updatedFavorites);
  } catch (error) {
    console.error('Error deleting product from customer favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = deleteFavoritesCustomerHandler;