import React from "react";
import Events from "../components/Events";

const events = () => {
  return (
    <main className="container my-5">
      <h1 className="title">Past Events</h1>
      <p className="mb-4">
        In addition to hosting our regular Club nights at Carlton Activity
        Centre, we offer a range of events throughout the year. Some of our
        recent events are shown below.
      </p>
      <Events />
    </main>
  );
};

export default events;
