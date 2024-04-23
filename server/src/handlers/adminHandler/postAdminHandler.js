const postAdmin = require("../../controllers/Admin/postAdmin");

const postAdminHandler = async (req, res) => {
  try {
    
    const { username, password, mercadoPagoClientId, email, mercadoPagoClientSecret, image } = req.body; 
  
    if (!username) return res.status(400).json({ error: "Falta username" });
    const AdminData = { username, password, mercadoPagoClientId, email, mercadoPagoClientSecret, image }

    const newAdmin = await postAdmin(AdminData);
    return res.status(201).json(newAdmin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postAdminHandler;