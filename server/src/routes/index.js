const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getCustomersHandler = require('../handlers/customerHandler/getCustomerHandler');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

Router.get('/customers', getCustomersHandler);


module.exports = router;
