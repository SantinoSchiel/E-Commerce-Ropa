const { Customer } = require("../../db");

const deleteFavoritesCustomer = async (customerId, productId) => {
    try {
        // Busca al cliente en la base de datos
        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new Error("El cliente no existe.");
        }

        // Obtén la lista de favoritos del cliente
        let favorites = customer.favorites || [];

        // Elimina el producto del array de favoritos si está presente
        const updatedFavorites = favorites.filter(fav => fav !== productId);

        // Actualiza la lista de favoritos del cliente en la base de datos
        await Customer.update({ favorites: updatedFavorites }, { where: { id: customerId } });

        // Retorna la lista de favoritos actualizada
        return updatedFavorites;
    } catch (error) {
        throw error;
    }
};

module.exports = deleteFavoritesCustomer;