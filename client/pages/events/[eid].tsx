import React from "react";
import { useRouter } from "next/router";
import Event from "components/Events/Event";
import Query from "components/query";
import { EVENTS_FIND_ONE } from "apollo/queries/event/event";

const event = () => {
  const router = useRouter();
  const { eid } = router.query;

  return (
    <div className="container my-5">
      <Query query={EVENTS_FIND_ONE} id={eid}>
        {({ data: { event } }) => <Event event={event} />}
      </Query>
    </div>
  );
};

export default event;
