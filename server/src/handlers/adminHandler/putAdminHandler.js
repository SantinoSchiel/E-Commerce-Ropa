const putAdmin = require("../../controllers/admin/putAdmin");

const putAdminHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const updateAdmin = await putAdmin( id, newData );
    return res.status(201).json(updateAdmin);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = putAdminHandler;
