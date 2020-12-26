import Menu from "components/Profile/Menu";
import Renewal from "components/Profile/Renewal";
import React from "react";

const renewal = () => {
  return (
    <div className="profile-container">
      <Menu active={"renewal"} />
      <Renewal />
    </div>
  );
};

export default renewal;
