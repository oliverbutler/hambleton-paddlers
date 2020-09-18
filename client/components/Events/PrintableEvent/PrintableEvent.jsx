import React, { useRef } from "react";
import styles from "./PrintableEvent.module.scss";
import EventTab from "../EventTab";
import ReactMarkdown from "react-markdown";
import moment from "moment";

const PrintableEvent = ({ event }) => {
  return (
    <div className="container my-5">
      <div className="content">
        <p style={{ textAlign: "center" }}>SENSITIVE INFORMATION</p>
        <img src="/logo.png" style={{ height: 150, float: "right" }} />
        <h1 className="title is-2">CTP1</h1>
        <p>
          Please print this document, fill it in and sign it appropriately.
          Please keep a record of the completed document.
        </p>
        <h1 className="title is-3">Event Info</h1>
        <EventTab event={event} isSingleEvent />
        <h1 className="title is-3">Lead Member</h1>
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
                {event.lead_member.given_name} {event.lead_member.family_name}
              </b>
            </p>
            <p>
              Mobile: {event.lead_member.contact.mobile_phone}
              <br />
              Email: {event.lead_member.contact.email}
            </p>
          </div>
        </div>
        <h1 className="title is-3">Description</h1>
        <ReactMarkdown source={event.description} />
        <h1 className="title is-3" style={{ pageBreakBefore: "always" }}>
          PART A – Risk Assessment:
        </h1>
        <div
          className={"tile is-ancestor " + styles.risk}
          style={{ height: 450 }}
        >
          <div className="tile is-parent">
            <div className="tile is-child">
              <p>
                <b>Known dangers associated with the trip:</b>
              </p>
            </div>
          </div>
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child">
              <p>
                <b>
                  How will any identified dangers be handled to minimise risk:
                </b>
              </p>
            </div>
            <div className="tile is-child">
              <p>
                <b>
                  Are there any suitable emergency extraction points on the
                  trip? YES / NO
                </b>
              </p>
              <p>If YES, where are these?</p>
            </div>
          </div>
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child">
              <p>
                <b>Is there any land based support being provided? YES / NO</b>
              </p>
              <p> If YES, where and how will it be used?</p>
            </div>
            <div className="tile is-child">
              <p>
                If NO, what extra measures are to be taken to compensate for
                this?
              </p>
            </div>
          </div>
        </div>
        <div
          className={"tile is-ancestor " + styles.risk}
          style={{ height: 450 }}
        >
          <div className="tile is-parent">
            <div className="tile is-child">
              <p>
                <b>Weather Forecast: </b> <br /> <br />
                3 days before the event: <br /> <br /> <br />
                <br /> <br />
                The morning of the event:
              </p>
            </div>
          </div>
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child">
              <p>
                <b>
                  Are you satisfied that the weather does not pose any risks to
                  the Trip/Event? YES / NO
                </b>
              </p>
              <p>If YES, please specify why and outline your recommendation:</p>
            </div>
            <div className="tile is-child">
              <p>
                <b>
                  Please confirm what emergency equipment will be taken on the
                  Trip/Event:
                </b>
              </p>
            </div>
          </div>
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child">
              <p>
                <b>
                  What are the arrangements for shuttling people to the
                  start/finish?
                </b>
              </p>
            </div>
            <div className="tile is-child">
              <p>
                <b>
                  If using the Club trailer, please tick to confirm the
                  following was carried out before using it:
                </b>
              </p>
              <p>
                The person using it has a valid licence: An inspection has been
                carried out: The trailer Certificate of Road Worthiness is valid
                at the date of use: Locking devices are to be used:
              </p>
            </div>
          </div>
        </div>
        <h1 className="title is-3" style={{ pageBreakBefore: "always" }}>
          Part B - Details of Participants:
        </h1>
        <table className="table is-bordered is-striped">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Role</th>
              <th>Allergies</th>
              <th>Other Medical</th>
              <th>Kit</th>
              <th>Age</th>
              <th>Signed Consent (18+)</th>
              <th>Attended</th>
            </tr>
          </thead>
          <tbody>
            {event.attendees
              .sort((a, b) => (a.role > b.role ? 1 : -1))
              .map((a) => (
                <tr>
                  <td>
                    <figure className="image is-64x64">
                      <img
                        className="is-rounded"
                        src={_.get(a.member, "picture.url", "")}
                      />
                    </figure>
                  </td>
                  <td>
                    {a.member.given_name} {a.member.family_name}
                  </td>
                  <td>{a.role}</td>
                  <td>{a.member.allergies}</td>
                  <td>{a.member.other_medical}</td>
                  <td>{a.member.kit}</td>
                  <td>
                    {moment().diff(a.member.date_of_birth, "years") <= 18
                      ? moment().diff(a.member.date_of_birth, "years")
                      : "18+"}
                  </td>
                  <td>yes</td>
                  <td></td>
                </tr>
              ))}
            {[...Array(5)].map(() => (
              <tr style={{ height: 64 }}>
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
                <td />
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="title is-3" style={{ pageBreakBefore: "always" }}>
          Part C – To be completed by the Lead Person at the end of the
          Trip/Event{" "}
        </h2>
        <p>
          <b>Trip Summary </b>– If the Trip/Event ran smoothly with nothing to
          report, leave this space blank
        </p>
        <div
          style={{ height: 200, width: "100%", border: "1px solid #f1f1f1" }}
        ></div>
        <p>
          <b>Learning Log </b>– Please record anything that you feel we could do
          differently to improve
        </p>
        <div
          style={{ height: 200, width: "100%", border: "1px solid #f1f1f1" }}
        ></div>
        <p>
          <b>Incident report </b>– Please record any incidents that occurred
          that the Club should be made aware of, including details of how it was
          handled
        </p>
        <div
          style={{ height: 150, width: "100%", border: "1px solid #f1f1f1" }}
        ></div>
        <br />
        <p>
          <b>Signature:</b>
        </p>
        <br />
        <p>
          <b>Print Name:</b>
        </p>
        <br />
        <p>
          <b>Date:</b>
        </p>
        <br /> <br /> <br />
        <br />
        <p>
          This form was auto-generated with the https://hambletonpaddlers.co.uk
          website, please contact the committee if there are any issues with the
          form
        </p>
      </div>
    </div>
  );
};

export default PrintableEvent;
