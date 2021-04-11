import React, { useEffect } from "react";
import Events from "components/Events";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import _ from "lodash";
import { motion } from "framer-motion";
import { getInstance } from "utils/axios";

const events = ({ pastEvents }) => {
  const currentUser = useSelector((s) => s.currentUser);
  const events = useSelector((s) => s.events.events);
  const settings = useSelector((s) => s.settings);

  return (
    <main className="container my-5" style={{ minHeight: "75vh" }}>
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {!currentUser.loggedIn && (
            <>
              <h1 className="title">Past Events</h1>
              <p className="mb-4">
                In addition to hosting our regular Club nights at Carlton
                Activity Centre, we offer a range of events throughout the year.
                Some of our recent events are shown below.
              </p>
              {settings.membership && (
                <div className="notification is-info is-light mt-4">
                  To see upcomming events and more information, please{" "}
                  <Link href="/login">login</Link> to your Hambleton Paddlers
                  account.
                </div>
              )}
            </>
          )}
          {currentUser.loggedIn && (
            <>
              <h1 className="title">Upcomming Events</h1>
              <Events
                events={_.filter(
                  events,
                  (e) =>
                    new Date(e.date_start) > new Date(new Date().toDateString())
                )}
              />
              <h1 className="title">Past Events</h1>
            </>
          )}
          {pastEvents && (
            <Events
              events={_.reject(
                pastEvents,
                (e) =>
                  new Date(e.date_start) > new Date(new Date().toDateString())
              )}
            />
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default events;

export const getStaticProps = async () => {
  const pastEvents = await getInstance()
    .get("/events/past")
    .then((res) => res.data)
    .catch(() => null);

  if (!pastEvents) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pastEvents,
    },
    revalidate: 1,
  };
};
