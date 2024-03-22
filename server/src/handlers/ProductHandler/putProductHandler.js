const putProduct = require("../../controllers/Product/putProduct");

const putProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updateProduct = await putProduct( id, newData );
    return res.status(201).json(updateProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putProductHandler;
