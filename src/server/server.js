// src/server/server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON requests

// Endpoint to initiate payment
app.post("/api/payment/initiate", async (req, res) => {
    const { amount, purchase_order_id, product_name, customer_name, customer_email, customer_phone } = req.body;

    const payload = {
        return_url: "http://localhost:3000/PatientHome",  // Your frontend URL after successful payment
        amount: amount * 100, // Convert to paisa
        purchase_order_id: purchase_order_id,
        product_name: product_name,
        customer_name: customer_name,
        customer_email: customer_email,
        customer_phone: customer_phone,
    };

    try {
        const response = await axios.post(
            "https://pay.periwin.com/api/payment/process/initiate/",
            payload,
            {
                headers: {
                    Authorization: `Bearer live_secret_key_68791341fdd94846a146f0457ff7b455`, // Use your actual API key
                },
            }
        );

        res.json(response.data); // Send response to frontend
    } catch (error) {
        console.error("Payment initiation failed:", error);
        res.status(500).json({ message: "Payment initiation failed", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
