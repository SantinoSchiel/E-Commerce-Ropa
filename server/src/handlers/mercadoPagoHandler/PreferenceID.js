const { MercadoPagoConfig, Preference } = require('mercadopago');
const { ACCESS_TOKEN } = process.env;

const PreferenceID = async (req, res) => {
    try {

        const { products } = req.body;
        console.log(products, 'products');
        const productID = products[0].id;

        // console.log(products , 'products');

        console.log("ANTES DE client")
        const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
        console.log("DESPUES DE client")

        const origen = () => {
            if (products.length === 1) {
                const isSuccessConditionMet = true;
                const redirectUrl = isSuccessConditionMet ? `http://localhost:5173/product/${productID}` : 'http://localhost:5173/cart';
                return redirectUrl;
            } else {
                const isSuccessConditionMet = false;
                const redirectUrl = isSuccessConditionMet ? `http://localhost:5173/product/${productID}` : 'http://localhost:5173/cart';
                return redirectUrl;
            }
        }


        const succesURL = origen();
        console.log(succesURL, 'succesURL');

        const body = {
            items: products,
            back_urls: {
                success: succesURL,
                failure: 'http://localhost:5173',
                pending: 'http://localhost:5173'
            },
            notification_url: 'https://lodenuchy.onrender.com',
            auto_return: 'approved'
        };

        const preference = new Preference(client);

        const result = await preference.create({ body });
        console.log(result, 'result');

        res.json({
            id: result.id
        });

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
};

module.exports = PreferenceID;