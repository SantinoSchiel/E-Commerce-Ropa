const { Router } = require('express');

// Importar todos los routers

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Ruta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Utiliza el nombre original de la imagen
    }
});

const upload = multer({ storage: storage }).array('images', 10);

function uploadMultipleImages(req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Multer ha encontrado un error
            return res.status(500).json({ error: 'Error al cargar imágenes' });
        } else if (err) {
            // Otro tipo de error
            return res.status(500).json({ error: err.message });
        }
        // No hay errores, pasa al siguiente middleware
        next();
    });
}

const postCustomerHandler = require('../handlers/customerHandler/postCustomerhandler');
const getCustomerHandler = require('../handlers/customerHandler/getCustomerHandler');
const putCustomerHandler = require('../handlers/customerHandler/putCustomerHandler');
const putCustomerCartHandler = require('../handlers/customerHandler/putCustomerCartHandler');

const postProductHandler = require('../handlers/ProductHandler/postProductHandler');
const getProductHandler = require('../handlers/ProductHandler/getProductHandler');
const putProductHandler = require('../handlers/ProductHandler/putProductHandler');

const preferenceID = require('../handlers/mercadoPagoHandler/PreferenceID');
const postMPHandler = require('../handlers/mercadoPagoHandler/postMPHandler');
const getMPHandler = require('../handlers/mercadoPagoHandler/getMPHandler');
const putMPHandler = require('../handlers/mercadoPagoHandler/putMPHandler');

const getAdminHandler = require('../handlers/adminHandler/getAdminHandler');
const putAdminHandler = require('../handlers/adminHandler/putAdminHandler');
const postAdminHandler = require('../handlers/adminHandler/postAdminHandler');

const deleteCartCustomerHandler = require('../handlers/customerHandler/deleteCartCustomerHandler');
const putCustomerFavoritesHandler = require('../handlers/customerHandler/putCustomerFavoritesHandler');
const deleteFavoritesCustomerHandler = require('../handlers/customerHandler/deleteFavoritesCustomerHandler');

const postPurchaseHandler = require('../handlers/PurchaseHandler/postPurchaseHandler');
const getpurchaseHandler = require('../handlers/PurchaseHandler/getPurchaseHandler');
const putPurchaseHandler = require('../handlers/PurchaseHandler/putPurchaseHandler');

const postWebhook = require('../handlers/WebHook/WebHook');

const router = Router();

// Configurar los routers

router.post('/customer', postCustomerHandler);
router.get('/customer', getCustomerHandler);
router.put('/customer/:id', putCustomerHandler);

router.put('/customer/cart/:id', putCustomerCartHandler);
router.delete('/customer/cart/:customerId/:productId', deleteCartCustomerHandler);

router.put('/customer/favorites/:id', putCustomerFavoritesHandler);
router.delete('/customer/favorites/:customerId/:productId', deleteFavoritesCustomerHandler);

router.post('/product', uploadMultipleImages, postProductHandler);
router.get('/product', getProductHandler);
router.put('/product/:id', uploadMultipleImages, putProductHandler);

router.post('/create-order', preferenceID);

router.post('/admin', postAdminHandler);
router.get('/admin', getAdminHandler);
router.put('/admin/:id', putAdminHandler);

router.post('/purchase', postPurchaseHandler);
router.get('/purchase', getpurchaseHandler);
router.put('/purchase/:id', putPurchaseHandler);

router.post('/webhook', postWebhook);

module.exports = router;