const postCustomer = require("../../controllers/customer/postCustomer");

const postCustomerHandler = async (req, res) => {
  try {
    
    const { firstname, secondname, phone, email, adress, image } = req.body; 
  
    if (!firstname) return res.status(400).json({ error: "Falta Name" });
    const CustomerData = { firstname, secondname, phone, email, adress, image }

    const newCustomer = await postCustomer(CustomerData);
    return res.status(201).json(newCustomer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postCustomerHandler;