import React from "react";
import Events from "components/Events";

const events = () => {
  return (
    <main className="container my-5">
      <div className="content">
        <h1 className="title">Past Events</h1>
        <p className="mb-4">
          In addition to hosting our regular Club nights at Carlton Activity
          Centre, we offer a range of events throughout the year. Some of our
          recent events are shown below.
        </p>
        <Events />
      </div>
    </main>
  );
};

export default events;
