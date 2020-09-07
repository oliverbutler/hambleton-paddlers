import React from "react";
import ReactMarkdown from "react-markdown";
import EventBadge from "components/EventBadge";
import moment from "moment";
import Link from "next/link";

var signedIn = false;

const Event = ({ event }) => {
  return (
    <div>
      <article className="media mx-3 my-3">
        <figure className="media-left">
          <p className="image is-128x128">
            <img
              src={
                event.thumbnail
                  ? "http://localhost:1337" + event.thumbnail.url
                  : "/kayak.png"
              }
            />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <h2>{event.title}</h2>
            {event.type.map((type) => (
              <EventBadge type={type} />
            ))}
            <p>
              {moment(event.date_start).format("LL")}{" "}
              {moment(event.date_start).format("HH:mm")}-
              {moment(event.date_end).format("HH:mm")}
            </p>

            <p>{event.summary}</p>
          </div>
        </div>
      </article>

      {signedIn ? (
        <>
          <h1 className="title is-4">Description</h1>
          <ReactMarkdown source={event.description} />
        </>
      ) : (
        <div className="notification is-info is-light mt-4">
          To see more information, please <Link href="/login">login</Link> to
          your Hambleton Paddlers account.
        </div>
      )}
    </div>
  );
};

export default Event;
