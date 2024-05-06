const getCustomer = require("../../controllers/customer/getCustomer");

const getCustomerHandler = async (req, res) => {
  try {
  
    const allCustomer = await getCustomer();

    if(allCustomer.length < 1) return res.status(400).json({error: 'No existen usuarios'})

    return res.status(201).json(allCustomer);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports = getCustomerHandler;