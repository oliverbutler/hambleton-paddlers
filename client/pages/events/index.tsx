import React from "react";
import Events from "components/Events";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Query from "components/query";
import { EVENTS_QUERY } from "apollo/queries/event/event";
import _ from "lodash";

const events = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  return (
    <main className="container my-5">
      <div className="content">
        {!currentUser.loggedIn && (
          <>
            <h1 className="title">Past Events</h1>
            <p className="mb-4">
              In addition to hosting our regular Club nights at Carlton Activity
              Centre, we offer a range of events throughout the year. Some of
              our recent events are shown below.
            </p>
            <div className="notification is-info is-light mt-4">
              To see upcomming events and more information, please{" "}
              <Link href="/login">login</Link> to your Hambleton Paddlers
              account.
            </div>
          </>
        )}
        <Query query={EVENTS_QUERY} id={null}>
          {({ data: { events } }) => (
            <>
              {currentUser.loggedIn && (
                <>
                  <h1 className="title">Upcomming Events</h1>
                  <Events
                    events={_.filter(
                      events,
                      (e) =>
                        new Date(e.date_start) >
                        new Date(new Date().toDateString())
                    )}
                  />
                  <h1 className="title">Past Events</h1>
                </>
              )}
              <Events
                events={_.reject(
                  events,
                  (e) =>
                    new Date(e.date_start) > new Date(new Date().toDateString())
                )}
              />
            </>
          )}
        </Query>
      </div>
    </main>
  );
};

export default events;
