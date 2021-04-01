import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import styles from "./CheckoutForm.module.scss";
import { SyncLoader } from "react-spinners";

import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { getInstance } from "utils/axios";

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    getInstance()
      .get("/payments/create-payment-intent")
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      Swal.fire(
        "Payment Successful!",
        "Your payment of £50.00 went through, and your membership will be activated momentarily",
        "success"
      );

      router.push("/profile");
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit} className={styles.cardForm}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        className="button is-primary mt-4"
      >
        <span id="button-text">
          {processing ? <SyncLoader size={12} color="white" /> : "Pay"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {succeeded && (
        <p>
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.
          </a>{" "}
          Refresh the page to pay again.
        </p>
      )}
    </form>
  );
}
