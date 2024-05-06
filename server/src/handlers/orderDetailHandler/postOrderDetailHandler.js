const postOrderDetail = require("../../controllers/orderDetail/postOrderDetail");

const postOrderDetailHanlder = async (req, res) => {
  try {
    const data = req.body;

    const newOrderDetail = await postOrderDetail(data);

    return res.status(201).json(newOrderDetail);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postOrderDetailHanlder;
