import React from "react";
import Profile from "components/Profile";
import { motion } from "framer-motion";

const profile = () => {
  return (
    <div className="container my-5">
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Profile />
        </motion.div>
      </div>
    </div>
  );
};

export default profile;
