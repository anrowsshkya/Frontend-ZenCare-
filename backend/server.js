const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to verify payment using Khalti API
app.post('/khalti/verify', async (req, res) => {
    const { token, amount } = req.body;

    try {
        // Call Khalti's verify API
        const response = await axios.post(
            'https://khalti.com/api/v2/payment/verify/',
            { token, amount },
            {
                headers: {
                    Authorization: `Key live_secret_key_68791341fdd94846a146f0457ff7b455`,  // Replace with your Khalti secret key
                },
            }
        );

        if (response.data) {
            res.json({ success: true, data: response.data });
        } else {
            res.json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
