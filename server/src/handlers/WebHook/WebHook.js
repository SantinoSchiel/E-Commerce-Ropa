const postWebhook = (req, res) => {
    try {
        // Log completo del body recibido
        console.log('Webhook received:', JSON.stringify(req.body, null, 2));

        // Verificar si el body contiene la estructura esperada
        if (req.body && req.body.data && req.body.data.id) {
            const paymentId = req.body.data.id;
            console.log('Payment ID:', paymentId);

            // Aquí puedes manejar el paymentId como necesites
            res.status(200).send('Webhook processed successfully');
        } else {
            console.warn('Unexpected webhook payload:', req.body);
            res.status(400).send('Invalid webhook payload');
        }
    } catch (error) {
        console.error('Error handling webhook:', error.message);
        res.status(500).send(`Error handling webhook: ${error.message}`);
    }
};

module.exports = postWebhook;  