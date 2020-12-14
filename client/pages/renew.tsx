import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { SubscriptionManager } from "framer-motion/types/utils/subscription-manager";

const renew = () => {
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
            <h1 className="title is-4">Renew your Membership</h1>
            <p>
              To renew our membership we rely on BACS bank transfers as our
              primary and preferred method, if you wish to pay by cash or cheque
              please contact us directly rather than using the online forms
            </p>

            <p>Please pay: £{user.renewal_cost}</p>
            <p>Reference: M-{user._id.substring(1, 6)}</p>
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default renew;
