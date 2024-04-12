const getOrderDetail = require("../../controllers/orderDetail/getOrderDetail");

const getOrderDetailHandler = async (req, res) => {
  try {
  
    const allOrderDetail = await getOrderDetail();

    if(allOrderDetail.length < 1) return res.status(400).json({error: 'No existe el detalle de orden que estas buscando'});

    return res.status(201).json(allOrderDetail);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports = getOrderDetailHandler;