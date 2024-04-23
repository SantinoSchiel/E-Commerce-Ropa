const { Product } = require("../../db");

const postProducts = async function (data) {
    console.log(data, 'data');

    if (!data.name || !data.price || !data.size || !data.color || !data.description || !data.adminId || !data.images) {
        throw new Error('Faltan datos obligatorios para crear el producto');
    }

    const productExistence = await Product.findOne({ where: { name: data.name } });

    if (productExistence) return { error: 'El producto ya existe' };

    const price = Number(data.price);
    console.log(price);

    console.log('ANTES DE CREAR PRODUCTO');

    try {
        const newProduct = await Product.create({
            name: data.name,
            price: price,
            size: data.size,
            color: data.color,
            description: data.description,
            adminId: data.adminId,
            images: data.images
        });

        console.log('DESPUES DE CREAR PRODUCTO', newProduct);

        return newProduct;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw new Error('Error al crear el producto');
    }
};

module.exports = postProducts;