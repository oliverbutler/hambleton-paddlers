import React from "react";
import Profile from "components/Profile";
import { motion } from "framer-motion";
import Menu from "components/Profile/Menu";

const profile = () => {
  return (
    <div className="profile-container">
      <Menu active={"dashboard"} />
      <Profile />
    </div>
  );
};

export default profile;
