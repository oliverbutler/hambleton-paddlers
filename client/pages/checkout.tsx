import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { SubscriptionManager } from "framer-motion/types/utils/subscription-manager";
import Checkout from "components/Checkout";

const checkout = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const user = currentUser.user;

  return (
    <div
      className="container mt-5"
      style={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="content">
        {currentUser.loggedIn ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="title is-4">Purchase your Membership</h1>

            <Checkout />
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default checkout;
