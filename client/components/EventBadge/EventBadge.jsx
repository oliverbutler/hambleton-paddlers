import React from "react";
import { useState } from "react";

const EventBadge = ({ type }) => {
  return (
    <span className={`tag is-${type.colour} mr-1`}>
      {type.name.replace("_", " ")}
    </span>
  );
};

export default EventBadge;
