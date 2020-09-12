import React from "react";
import { colour } from "utils/functions";
import moment from "moment";
import EventBadge from "components/EventBadge";

const EventTab = ({ event, isSingleEvent }) => {
  return (
    <article
      className="media"
      style={{ borderLeft: `5px solid ${colour(event.level)}` }}
    >
      <figure
        className={"media-left my-0 " + isSingleEvent && "ml-0"}
        style={{ alignSelf: "center", alignContent: "center" }}
      >
        <p className="image is-128x128">
          <img src={"http://localhost:1337" + event.thumbnail.url} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <h2>
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
          </h2>
          {event.type.map((type) => (
            <EventBadge type={type} />
          ))}
          <p>{moment(event.date_start).format("LL")}</p>
          <p>{event.summary}</p>
        </div>
      </div>
    </article>
  );
};

export default EventTab;
