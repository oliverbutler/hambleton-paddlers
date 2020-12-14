import Register from "components/Register";
import { motion } from "framer-motion";
import React from "react";

const register = () => {
  return (
    <div className="container my-5">
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <p className="title">
            Register for a Membership Online{" "}
            <span className="tag is-success">NEW</span>
          </p>

          <p>
            Once your request has being submitted we will look over the request
            before contacting you directly at your given email
          </p>
          <Register />
        </motion.div>
      </div>
    </div>
  );
};

export default register;
