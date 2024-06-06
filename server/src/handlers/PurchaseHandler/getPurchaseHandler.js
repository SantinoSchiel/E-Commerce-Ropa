const getPurchase = require("../../controllers/Purchase/getPurchase");

const getPurchaseHandler = async (req, res) => {
  try {
  
    const allPurchase = await getPurchase();

    if(allPurchase.length < 1) return res.status(400).json({error: 'No existen los Purchaseos que estas buscando'});

    return res.status(201).json(allPurchase);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports = getPurchaseHandler;