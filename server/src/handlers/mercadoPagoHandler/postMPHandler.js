const { MercadoPagoConfig, Preference } = require('mercadopago');
const { ACCESS_TOKEN } = process.env;

const postMpHandler = async (req, res) => {
    try {

        const { products } = req.body;

        console.log(products)

        const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

        const body = {
            items: products,
            back_urls: {
                success: 'https://www.npmjs.com/package/mercadopago?activeTab=readme',
                failure: 'https://ar.search.yahoo.com/search?fr=mcafee&type=E210AR91215G0&p=mercadopago+developers',
                pending: 'https://www.youtube.com/watch?v=-VD-l5BQsuE&t=1184s&ab_channel=onthecode'
            },
            notification_url: 'https://www.npmjs.com/package/mercadopago?activeTab=readme',
            auto_return: 'approved'
        };

        const preference = new Preference(client);

        const result = await preference.create({ body });

        res.json({
            id: result.id
        });

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
};

module.exports = postMpHandler;