const putOrderDetail = require("../../controllers/OrderDetail/putOrderDetail");

const putOrderDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updateOrderDetail = await putOrderDetail( id, newData );
    return res.status(201).json(updateOrderDetail);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putOrderDetailHandler;