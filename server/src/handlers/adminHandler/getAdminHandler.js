const getAdmin = require("../../controllers/admin/getAdmin");

const getAdminHandler = async (req, res) => {
  try {
  
    const allAdmin = await getAdmin();

    if(allAdmin.length < 1) return res.status(400).json({error: 'No existen usuarios'})

    return res.status(201).json(allAdmin);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports = getAdminHandler;