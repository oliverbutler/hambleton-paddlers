import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import EventBadge from "components/EventBadge";
import moment from "moment";
import Link from "next/link";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { colour } from "utils/functions";
import EventTab from "../EventTab";

const Event = ({ event }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [location, setLocation] = useState({});

  var coaches = _.filter(event.attendees, { level: "coach" });

  var normalAttendees = _.reject(event.attendees, { level: "coach" });

  var key = "AIzaSyBXbtSCjzHJPp6oNliAVRLU2ecNVCtnVtw";

  return (
    <div>
      <div className="columns">
        <div className="column">
          <EventTab event={event} hideCancel />
          {event.cancelled && (
            <article className="message is-danger mt-4">
              <div className="message-header">
                <p>Event Cancelled</p>
              </div>
              <div className="message-body">{event.cancel_reason}</div>
            </article>
          )}
          {currentUser.loggedIn ? (
            <>
              <h1 className="title is-4">Description</h1>
              <ReactMarkdown source={event.description} />
            </>
          ) : (
            <div className="notification is-info is-light mt-4">
              To see more information, please <Link href="/login">login</Link>{" "}
              to your Hambleton Paddlers account.
            </div>
          )}
        </div>
        <div className="column">
          <iframe
            width="600"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${key}
    &q=${event.location}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {currentUser.loggedIn && (
        <>
          <h1 className="title is-4">Coaches</h1>
          <div className="attendees" style={{ display: "flex" }}>
            <br />
            {coaches.map((member, index) => (
              <figure
                class="image is-64x64 mx-2 my-2"
                key={`attendee-${index}`}
              >
                <img
                  className="is-rounded"
                  src={`http://localhost:1337${member.picture.url}`}
                />
              </figure>
            ))}
          </div>
          <h1 className="title is-4">Attendees</h1>
          <div className="attendees" style={{ display: "flex" }}>
            <br />
            {normalAttendees.map((member, index) => (
              <figure
                class="image is-64x64 mx-2 my-2"
                key={`attendee-${index}`}
              >
                <img
                  className="is-rounded"
                  src={`http://localhost:1337${member.picture.url}`}
                />
              </figure>
            ))}
          </div>

          {event.files.length > 0 && <h1 className="title is-4">Files</h1>}
          {event.files.map((file, index) => (
            <div key={`file-${index}`}>
              <a href={`http://localhost:1337${file.url}`}>{file.name}</a>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Event;
