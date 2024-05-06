const putOrder = require("../../controllers/order/putOrder");

const putOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updateOrder = await putOrder( id, newData );
    return res.status(201).json(updateOrder);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putOrderHandler;