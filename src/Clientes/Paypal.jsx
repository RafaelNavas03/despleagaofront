// PayPal.js

import React, { useContext,useRef, useEffect } from 'react';
import { CartContext } from '../context/CarritoContext';

const PayPal = () => {
  const [cart, setCart] = useContext(CartContext);
  const totalPrice = cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);


  useEffect(() => {
    console.log('PayPal Component - useEffect 1');
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          // Set up the transaction details, including the total amount
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toFixed(2), // Ensure the total amount is formatted correctly
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          // Capture the funds from the transaction
          return actions.order.capture().then(function (details) {
            // Call a function to handle the successful payment
            handlePaymentSuccess(details);
          });
        },
        onError: function (err) {
          // Handle errors during the transaction
          console.error('Error during PayPal transaction:', err);
        },
      }).render('#paypal-button-container'); // Specify the ID of the container where the button will be rendered
    }
  }, [totalPrice]);

  const handlePaymentSuccess = (details) => {
    // Handle the successful payment, e.g., update the order status, clear the cart, etc.
    console.log('Payment completed successfully:', details);

    // Clear the cart after a successful payment
    setCart([]);
    CerrarModal();
  };

  return (
    <>
      <div id="paypal-button-container"></div>
    </>
  );
};

export default PayPal;
