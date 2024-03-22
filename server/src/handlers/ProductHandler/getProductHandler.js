const getProduct = require("../../controllers/Product/getProduct");

const getProductHandler = async (req, res) => {
  try {
  
    const allProducts = await getProduct();

    if(allProducts.length < 1) return res.status(400).json({error: 'No existen los productos que estas buscando'});

    return res.status(201).json(allProducts);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports = getProductHandler;