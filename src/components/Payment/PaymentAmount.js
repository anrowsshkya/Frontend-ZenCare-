/* global KhaltiCheckout */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import './PaymentAmount.css';

const PaymentAmount = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate
    const [amount, setAmount] = useState('');
    const [productName, setProductName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { doctorName, doctorFee, bookedDate, bookedSlot } = location.state || {};

    useEffect(() => {
        if (window.KhaltiCheckout) {
            // KhaltiCheckout is available globally
            console.log('KhaltiCheckout is loaded');
        }
    }, []);

    useEffect(() => {
        if (doctorFee) {
            setAmount(doctorFee); // Set the fee from the appointment
        }
        if (doctorName) {
            setProductName(`Appointment with Dr. ${doctorName} on ${bookedDate} at ${bookedSlot}`);
        }
    }, [doctorFee, doctorName, bookedDate, bookedSlot]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!amount || !productName) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        const config = {
            publicKey: "live_secret_key_68791341fdd94846a146f0457ff7b455", // Your Khalti public key
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
                            if (response.data.success) {
                                console.log('Payment Verified');
                            } else {
                                alert('Verification Failed!');
                            }
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

        // ⬇️ Navigate to confirmation page immediately after widget is shown
        navigate('/paymentConfirm', {
            state: {
                paymentData: {
                    doctorName,
                    appointmentDate: bookedDate,
                    appointmentSlot: bookedSlot,
                    amount,
                    doctorImageUrl: null, // You can pass actual image URL if needed
                }
            }
        });

        setLoading(false);
    };

    return (
        <div className="payment-container">
            <h2>Make a Payment</h2>
            <div className="payment-details">
                <p><strong>Product Name:</strong> {productName}</p>
                <p><strong>Amount:</strong> Rs {amount}</p>
            </div>
            <form onSubmit={handlePayment} className="payment-form">
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
