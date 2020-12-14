import React from "react";
import { colour } from "utils/functions";
import moment from "moment";
import EventBadge from "components/EventBadge";
import Image from "next/image";

const EventTab = ({ event, isSingleEvent }) => {
  return (
    <div
      className="pl-3 columns"
      style={{
        cursor: "pointer",
      }}
    >
      <div className="column is-narrow">
        <p className="image is-128x128">
          <Image src={event.thumbnail.url} width={128} height={128} />
        </p>
      </div>

      <div className="column">
        <p className="title is-4">
          <span
            style={{
              textDecoration: event.cancelled && "line-through",
            }}
          >
            {event.title}
          </span>{" "}
          {event.cancelled && !isSingleEvent && (
            <span className="tag is-danger is-large">Cancelled</span>
          )}
        </p>
        <p className="subtitle is-5">{event.subtitle}</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {event.type.map((type) => (
            <div key={`type-${type.name}`}>
              <EventBadge type={type} />
            </div>
          ))}
        </div>

        <p>{moment(event.date_start).format("LL")}</p>
        <p>{event.summary}</p>
      </div>
    </div>
  );
};

export default EventTab;
