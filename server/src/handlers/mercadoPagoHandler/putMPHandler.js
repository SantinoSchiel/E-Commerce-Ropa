const putMP = require("../../controllers/mercadoPago/putMP");

const putMPHandler = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const newData = req.body;
    const updateMP = await putMP( transactionId, newData );
    return res.status(201).json(updateMP);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putMPHandler;