import React from "react";
import styles from "./Events.module.scss";
import Link from "next/link";
import EventTab from "./EventTab";

const Events = ({ events }) => {
  return (
    <div className="columns is-multiline is-widescreen">
      {events.map((event, index) => (
        <Link href={`/events/${event._id}`} key={`event-${index}`}>
          <div
            className={
              "column is-half-widescreen is-half-tablet is-half-fullhd mb-4 " +
              styles.event
            }
          >
            <EventTab event={event} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Events;
