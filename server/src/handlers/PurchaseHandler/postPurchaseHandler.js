const postPurchase = require("../../controllers/Purchase/postPurchase");

const postPurchaseHandler = async (req, res) => {
  try {
    
    const { paymentId, amount, cart, customerId, adminId } = req.body; 
  
    if (!paymentId) return res.status(400).json({ error: "Falta paymentId" });
    const PurchaseData = { paymentId, amount, cart, customerId, adminId }

    const newPurchase = await postPurchase(PurchaseData);
    return res.status(201).json(newPurchase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postPurchaseHandler;