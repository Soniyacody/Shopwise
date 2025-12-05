import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
const PayPalButton = ({ amount, onSuccess, onError }) => {
    const value = Number(amount || 0).toFixed(2);
    if (!amount || Number(amount) <= 0) {
        console.warn("Invalid Paypal amount : ", amount);
    }
    return (
        <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <PayPalButtons style={{ layout: "vertical" }} createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value } }]
                })
            }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onSuccess(details);
                    })
                }}
                onError={(err) => {
                    console.error("Paypal Error : ", err);
                }} />
        </PayPalScriptProvider>
    )
}

export default PayPalButton
