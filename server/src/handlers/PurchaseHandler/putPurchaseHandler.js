const putPurchase = require("../../controllers/Purchase/putPurchase");

const putPurchaseHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updatePurchase = await putPurchase( id, newData );
    return res.status(201).json(updatePurchase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putPurchaseHandler;