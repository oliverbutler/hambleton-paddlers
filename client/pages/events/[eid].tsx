import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Event from "components/Events/Event";
import PrintableEvent from "components/Events/PrintableEvent";
import { motion } from "framer-motion";

const event = () => {
  const router = useRouter();
  const { eid, print } = router.query;

  const events = useSelector((s) => s.events.events);

  const event = events.find((e) => e._id === eid);

  if (print) {
    return <div>{event && <PrintableEvent event={event} />}</div>;
  }

  return (
    <div className="container my-5">
      <div className="content">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {event && <Event event={event} />}
        </motion.div>
      </div>
    </div>
  );
};

export default event;
