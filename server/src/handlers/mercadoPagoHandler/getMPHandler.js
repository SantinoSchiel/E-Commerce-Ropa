const getMP = require("../../controllers/mercadoPago/getMP");

const getMPHandler = async (req, res) => {
  try {
  
    const allMP = await getMP();

    if(allMP.length < 1) return res.status(400).json({error: 'No existen MP'})

    return res.status(201).json(allMP);

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
};

module.exports = getMPHandler;