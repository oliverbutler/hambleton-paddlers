import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(
  "pk_test_51I1xqtARo26zQ4U3CI2FDVddZybL62NQnO0YtGdEgf3C59sF5jBmxHOqVoYgBGip4AzpXHn8kC1UyzHj1hAkNTfC00hyDA3L55"
);

const Checkout = () => {
  return (
    <Elements stripe={stripe}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
