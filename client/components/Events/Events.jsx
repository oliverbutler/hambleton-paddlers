import React from "react";
import moment from "moment";
import Query from "components/query";
import EventBadge from "components/EventBadge";
import { EVENTS_QUERY } from "apollo/queries/event/event";
import styles from "./Events.module.scss";
import Link from "next/link";

const Events = () => {
  return (
    <>
      <div className="notification is-info is-light mt-4">
        To see upcomming events and more information, please{" "}
        <Link href="/login">login</Link> to your Hambleton Paddlers account.
      </div>
      <div className="columns is-multiline">
        <Query query={EVENTS_QUERY} id={null}>
          {({ data: { events } }) =>
            events.map((event, index) => (
              <Link href={`/events/${event.id}`}>
                <div className={"column is-half " + styles.event}>
                  <article className="media mx-3 my-3" key={index}>
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
                        <p>{moment(event.date_start).format("LL")}</p>
                        <p>{event.summary}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </Link>
            ))
          }
        </Query>
      </div>
    </>
  );
};

export default Events;
