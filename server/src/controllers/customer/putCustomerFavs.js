const { Customer } = require("../../db");

const putCustomerFavorites = async (customerId, productId) => {
    try {
        console.log(productId, 'productId');
        // Busca al cliente en la base de datos
        const customer = await Customer.findOne({ where: { id: customerId } });
        if (!customer) {
            throw new Error("El cliente no existe.");
        }

        // Obtén la lista de favoritos del cliente
        let favorites = customer.favorites || [];

        // Si el producto no está en la lista de favoritos, agrégalo
        if (!favorites.includes(productId)) {
            favorites.push(productId);
        }

        // Actualiza la lista de favoritos del cliente en la base de datos
        await Customer.update({ favorites }, { where: { id: customerId } });

        // Retorna la lista de favoritos actualizada
        return favorites;
    } catch (error) {
        throw error;
    }
};

module.exports = putCustomerFavorites;