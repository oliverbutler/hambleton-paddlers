import React, { useState } from "react";
import moment from "moment";
import Query from "components/query";
import { COMMITTEE_MEMBER_QUERY } from "apollo/queries/committeeMember/committeeMember";
import ReactMarkdown from "react-markdown";
import _ from "lodash";
import CommitteeMember from "./CommitteeMember/CommitteeMember";

const CommitteeMembers = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <Query query={COMMITTEE_MEMBER_QUERY} id={null}>
        {({ data: { committeeMembers } }) =>
          committeeMembers.map((member, index) => {
            return (
              <CommitteeMember
                member={member}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            );
          })
        }
      </Query>
    </div>
  );
};

export default CommitteeMembers;
