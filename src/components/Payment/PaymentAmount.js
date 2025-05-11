import React, { useState } from 'react';
import axios from 'axios';
import './PaymentAmount.css';

const PaymentAmount = () => {
    const [amount, setAmount] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Define the Khalti checkout configuration
        const config = {
            publicKey: "test_public_key_dc74b7b5a8b84956a2b440f8aa7d67dc", // Your Khalti public key
            productIdentity: "1234567890",
            productName: productName,  // Dynamic product name from the form
            productUrl: "http://localhost:3000",  // Update this URL to where the user should be redirected after successful payment
            eventHandler: {
                onSuccess(payload) {
                    // Send payment verification request to your backend
                    console.log("Payment Successful:", payload);
                    axios.post('http://localhost:5000/khalti/verify', {
                        token: payload.token,
                        amount: payload.amount,
                    })
                        .then((response) => {
                            alert(response.data.success ? 'Payment Verified!' : 'Verification Failed!');
                        })
                        .catch((err) => {
                            console.error('Verification error:', err);
                            alert('Error verifying payment.');
                        });
                },
                onError(error) {
                    console.log('Payment Error:', error);
                },
                onClose() {
                    console.log('Khalti widget closed');
                },
            },
        };

        const checkout = new KhaltiCheckout(config);

        // Convert amount to paisa (1 NPR = 100 paisa)
        const amountInPaisa = parseFloat(amount) * 100;

        // Show the Khalti payment widget
        checkout.show({ amount: amountInPaisa });

        setLoading(false);
    };

    return (
        <div className="payment-container">
            <h2>Make a Payment</h2>
            <form onSubmit={handlePayment} className="payment-form">
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Customer Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Customer Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount (in Rs)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentAmount;
