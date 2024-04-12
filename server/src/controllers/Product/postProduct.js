const { Product } = require("../../db");

const postProducts = async function (data) {

    if (!data.name || !data.price || !data.size || !data.color || !data.description || !data.adminId) {
        throw new Error('Faltan datos obligatorios para crear el producto');
    }

    const productExistence = await Product.findOne({ where: { name: data.name } });

    if (productExistence) return { error: 'El producto ya existe' };

    const newProduct = await Product.create({ name: data.name, price: data.price, size: data.size, color: data.color, description: data.description, adminId: data.adminId });

    return newProduct;
};


module.exports = postProducts;