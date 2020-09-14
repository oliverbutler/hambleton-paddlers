import React from "react";
import styles from "./Events.module.scss";
import Link from "next/link";
import EventTab from "./EventTab";

const Events = ({ events }) => {
  return (
    <div className="columns is-multiline">
      {events.map((event, index) => (
        <Link href={`/events/${event._id}`} key={`event-${index}`}>
          <div className={"column is-half " + styles.event}>
            <EventTab event={event} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Events;
