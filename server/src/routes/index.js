const { Router } = require('express');

// Importar todos los routers

const postCustomerHandler = require('../handlers/customerHandler/postCustomerhandler');
const getCustomerHandler = require('../handlers/customerHandler/getCustomerHandler');
const putCustomerHandler = require('../handlers/customerHandler/putCustomerHandler');

const postProductHandler = require('../handlers/ProductHandler/postProductHandler');
const getProductHandler = require('../handlers/ProductHandler/getProductHandler');
const putProductHandler = require('../handlers/ProductHandler/putProductHandler');

const preferenceID = require('../handlers/mercadoPagoHandler/PreferenceID');
const postMPHandler = require('../handlers/mercadoPagoHandler/postMPHandler');
const getMPHandler = require('../handlers/mercadoPagoHandler/getMPHandler');
const putMPHandler = require('../handlers/mercadoPagoHandler/putMPHandler');

const getOrderHandler = require('../handlers/orderHandler/getOrderHandler');
const postOrderHandler = require('../handlers/orderHandler/postOrderHandler');
const putOrderHandler = require('../handlers/orderHandler/putOrderHandler');

const getOrderDetailHandler = require('../handlers/orderDetailHandler/getOrderDetailHandler');
const putOrderDetailHandler = require('../handlers/orderDetailHandler/putOrderDetailHandler');
const postOrderDetailHandler = require('../handlers/orderDetailHandler/postOrderDetailHandler');

const getAdminHandler = require('../handlers/adminHandler/getAdminHandler');
const putAdminHandler = require('../handlers/adminHandler/putAdminHandler');
const postAdminHandler = require('../handlers/adminHandler/postAdminHandler');

const router = Router();

// Configurar los routers

router.post('/customer', postCustomerHandler);
router.get('/customer', getCustomerHandler);
router.put('/customer/:id', putCustomerHandler);

router.post('/product', postProductHandler);
router.get('/product', getProductHandler);
router.put('/product/:id', putProductHandler);

router.post('/create-order', preferenceID);
router.post('/mercadopago', postMPHandler);
router.get('/mercadopago', getMPHandler);
router.put('/mercadopago/:transactionId', putMPHandler);

router.post('/order', postOrderHandler);
router.get('/order', getOrderHandler);
router.put('/order/:id', putOrderHandler);

router.post('/order-detail', postOrderDetailHandler);
router.get('/order-detail', getOrderDetailHandler);
router.put('/order-detail/:id', putOrderDetailHandler);

router.post('/admin', postAdminHandler);
router.get('/admin', getAdminHandler);
router.put('/admin/:id', putAdminHandler);

module.exports = router;
