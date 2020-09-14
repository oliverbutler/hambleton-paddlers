import React, { useState } from "react";
import _ from "lodash";
import CommitteeMember from "./CommitteeMember/CommitteeMember";

const CommitteeMembers = ({ content }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {content
        .sort((a, b) => (a.committee.order > b.committee.order ? 1 : -1))
        .map((member, index) => {
          return (
            <CommitteeMember
              member={member}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          );
        })}
    </div>
  );
};

export default CommitteeMembers;
