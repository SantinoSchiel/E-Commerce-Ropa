const putCustomerCart = require("../../controllers/customer/putCustomerCart");

const putCustomerCartHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updateProduct = await putCustomerCart(id, newData);
        return res.status(201).json(updateProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = putCustomerCartHandler;