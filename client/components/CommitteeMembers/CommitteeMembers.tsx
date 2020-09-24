import React, { useState } from "react";
import _ from "lodash";
import CommitteeMember from "./CommitteeMember/CommitteeMember";

const CommitteeMembers = ({ content }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return content.map((member, index) => {
    return (
      <CommitteeMember
        member={member}
        index={index}
        openIndex={openIndex}
        setOpenIndex={setOpenIndex}
      />
    );
  });
};

export default CommitteeMembers;
