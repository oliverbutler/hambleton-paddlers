import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import EventTab from "../EventTab";

const Event = ({ event }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [location, setLocation] = useState({});

  var attendees = _.groupBy(event.attendees, (a) => a.role);

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
        <div className="column is-half">
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
              <div className="columns">
                <div className="column is-narrow">
                  <figure class="image is-64x64 mx-2 my-2">
                    <img
                      className="is-rounded"
                      src={event.lead_member.picture.url}
                    />
                  </figure>
                </div>
                <div className="column">
                  <p>
                    <b>
                      {event.lead_member.given_name}{" "}
                      {event.lead_member.family_name}{" "}
                    </b>
                  </p>
                  <p>
                    Mobile: {event.lead_member.contact.mobile_phone}
                    <br />
                    Email: {event.lead_member.contact.email}
                  </p>
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
        <div className="column">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0, backgroundColor: "lightgrey" }}
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}
    &q=${event.location}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {currentUser.loggedIn && (
        <>
          {event.userPrivileged && (
            <div>
              <Link href={`/events/${event._id}?print=1`}>
                <button className="button is-primary mr-2">View CTP1</button>
              </Link>
              <button className="button is-light">View Attendence Form</button>
            </div>
          )}

          <ReactMarkdown source={event.description} />
          <div>
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
                        src={_.get(member.member, "picture.url", "")}
                      />
                      <p>{member.member.given_name}</p>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {event.files.length > 0 && <h1 className="title is-4">Files</h1>}
          {event.files.map((file, index) => (
            <div key={`file-${index}`}>
              <a href={file.url}>{file.name}</a>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Event;
