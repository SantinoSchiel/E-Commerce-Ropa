const { Router } = require('express');

// Importar todos los routers

const postCustomerHandler = require('../handlers/customerHandler/postCustomerhandler');
const getCustomerHandler = require('../handlers/customerHandler/getCustomerHandler');
const putCustomerHandler = require('../handlers/customerHandler/putCustomerHandler');

const router = Router();

// Configurar los routers

router.post('/customer', postCustomerHandler);

router.get('/customer', getCustomerHandler);

router.put('/customer/:id', putCustomerHandler);


module.exports = router;
