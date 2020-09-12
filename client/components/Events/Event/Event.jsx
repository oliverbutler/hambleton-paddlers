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

  var attendees = _.groupBy(event.attendees, (a) => a.role);

  var key = "AIzaSyBXbtSCjzHJPp6oNliAVRLU2ecNVCtnVtw";

  const roleName = (role) => {
    switch (role) {
      case "COACH":
        return "Coaches";
      case "PARTICIPANT":
        return "Attendees";
      case "VOLUNTEER":
        return "Volunteers";
    }
  };

  return (
    <div>
      <div className="columns">
        <div className="column">
          <EventTab event={event} isSingleEvent />
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
              <p>
                For this event {event.lead_member.given_name} will be your main
                point of contact for any questions.
              </p>
              <div className="columns">
                <div className="column is-narrow">
                  <figure class="image is-64x64 mx-2 my-2">
                    <img
                      className="is-rounded"
                      src={`http://localhost:1337${event.lead_member.picture.url}`}
                    />
                  </figure>
                </div>
                <div className="column">
                  <p>
                    <b>
                      {event.lead_member.given_name}{" "}
                      {event.lead_member.family_name}
                    </b>
                  </p>
                  <p>Mobile: {event.lead_member.contact.mobile_phone}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="notification is-info is-light mt-4">
              To see more information, please <Link href="/login">login</Link>{" "}
              to your Hambleton Paddlers account.
            </div>
          )}
        </div>
        <div className="column is-narrow">
          <iframe
            width="600"
            height="100%"
            frameBorder="0"
            style={{ border: 0, backgroundColor: "lightgrey" }}
            src={`https://www.google.com/maps/embed/v1/place?key=${key}
    &q=${event.location}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {currentUser.loggedIn && (
        <>
          <ReactMarkdown source={event.description} />
          {Object.keys(attendees).map((role, roleIndex) => (
            <div key={`role-${roleIndex}`}>
              <h1 className="title is-4">{roleName(role)}</h1>
              <div className="attendees" style={{ display: "flex" }}>
                {attendees[role].map((member, index) => (
                  <figure
                    class="image is-64x64 mx-2 my-2 mb-6"
                    key={`attendee-${index}`}
                  >
                    <img
                      className="is-rounded"
                      src={`http://localhost:1337${_.get(
                        member.member,
                        "picture.url",
                        ""
                      )}`}
                    />
                    <p>{member.member.given_name}</p>
                  </figure>
                ))}
              </div>
            </div>
          ))}

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
