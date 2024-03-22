const { Router } = require('express');

// Importar todos los routers

const postCustomerHandler = require('../handlers/customerHandler/postCustomerhandler');
const getCustomerHandler = require('../handlers/customerHandler/getCustomerHandler');
const putCustomerHandler = require('../handlers/customerHandler/putCustomerHandler');

const postProductHandler = require('../handlers/ProductHandler/postProductHandler');
const getProductHandler = require('../handlers/ProductHandler/getProductHandler');
const putProductHandler = require('../handlers/ProductHandler/putProductHandler');

const postMpHandler = require('../handlers/mercadoPagoHandler/postMPHandler');

const router = Router();

// Configurar los routers

router.post('/customer', postCustomerHandler);

router.get('/customer', getCustomerHandler);

router.put('/customer/:id', putCustomerHandler);

router.post('/product', postProductHandler);

router.get('/product', getProductHandler);

router.put('/product/:id', putProductHandler);

router.post('/create-order', postMpHandler);

module.exports = router;
