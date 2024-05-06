const postMP = require("../../controllers/mercadoPago/postMP");

const postMPHandler = async (req, res) => {
  try {
    
    const { transactionId, status, orderId } = req.body; 
  
    if (!transactionId) return res.status(400).json({ error: "Falta transactionId" });
    const MPData = { transactionId, status, orderId }

    const newMP = await postMP(MPData);
    return res.status(201).json(newMP);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postMPHandler;