const postCustomer = require("../../controllers/customer/postCustomer");

const postCustomerHandler = async (req, res) => {
  try {
    const { fullname, phone, email, address, image, password } = req.body;
    console.log("ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    // Verificar si el inicio de sesión se realiza con Google
    const isGoogleLogin = req.body.googleCredential !== undefined;

    // Si es un inicio de sesión con Google, no se requiere contraseña
    if (isGoogleLogin && !password) {
      return res.status(400).json({ error: "Falta contraseña" });
    }

    const data = { fullname, phone, email, address, image, password };
    console.log(data, 'data');

    if (!email) return res.status(400).json({ error: "Falta Name" });
    
    const CustomerData = { fullname, phone, email, address, image, password }

    console.log('ACAAAAAAAAA?')
    const newCustomer = await postCustomer(CustomerData);
    console.log('SUCCESSSSSSSSSSS')
    // console.log(newCustomer, 'newCustomer');
    return res.status(201).json(newCustomer);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postCustomerHandler;