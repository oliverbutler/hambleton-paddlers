import React from "react";
import { motion } from "framer-motion";
import Login from "components/Login";

const login = () => {
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Login />
        </motion.div>
      </div>
    </div>
  );
};

export default login;
