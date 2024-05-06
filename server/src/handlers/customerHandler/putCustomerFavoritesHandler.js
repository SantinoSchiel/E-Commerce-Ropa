const putCustomerFavorites = require('../../controllers/customer/putCustomerFavs');

const putCustomerFavoritesHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.body;

        // Llama al controlador para actualizar los favoritos del cliente
        const updatedFavorites = await putCustomerFavorites(id, productId);

        res.status(200).json(updatedFavorites);
    } catch (error) {
        console.error('Error updating customer favorites:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = putCustomerFavoritesHandler;