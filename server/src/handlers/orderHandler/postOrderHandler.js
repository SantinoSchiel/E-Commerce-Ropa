const postOrder = require("../../controllers/order/postOrder");

const postOrderHanlder = async (req, res) => {
  try {
    const data = req.body;

    const newOrder = await postOrder(data);

    return res.status(201).json(newOrder);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postOrderHanlder;
