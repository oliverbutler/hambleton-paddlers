import React from "react";
import moment from "moment";
import Query from "components/query";
import EVENTS_QUERY from "apollo/queries/event/event";
import ReactMarkdown from "react-markdown";

const Events = () => {
  return (
    <div className="columns">
      <Query query={EVENTS_QUERY} id={null}>
        {({ data: { events } }) =>
          events.map((event, index) => (
            <div className="column">
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
                    <p>{moment(event.date_start).format("LL")}</p>
                    <p>{event.summary}</p>
                  </div>
                </div>
              </article>
            </div>
          ))
        }
      </Query>
    </div>
  );
};

export default Events;
