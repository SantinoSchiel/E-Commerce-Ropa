const getOrder = require("../../controllers/order/getOrder");

const getOrderHandler = async (req, res) => {
  try {
  
    const allOrder = await getOrder();

    if(allOrder.length < 1) return res.status(400).json({error: 'No existe la orden que estas buscando'});

    return res.status(201).json(allOrder);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports = getOrderHandler;