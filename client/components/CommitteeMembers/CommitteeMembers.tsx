import React from "react";
import moment from "moment";
import Query from "components/query";
import COMMITTEE_MEMBER_QUERY from "apollo/queries/committeeMember/committeeMember";
import ReactMarkdown from "react-markdown";
import _ from "lodash";

const CommitteeMembers = () => {
  return (
    <div>
      <Query query={COMMITTEE_MEMBER_QUERY} id={null}>
        {({ data: { committeeMembers } }, index) =>
          committeeMembers.map((member) => {
            return (
              <article className="media mx-3 my-3" key={index}>
                <figure className="media-left">
                  <p className="image is-128x128">
                    <img
                      src={
                        member.picture
                          ? "http://localhost:1337" + member.picture.url
                          : "https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                      }
                    />
                  </p>
                </figure>
                <div className="media-content">
                  <div className="content">
                    <h2>
                      {member.role} - {member.given_name} {member.family_name}
                    </h2>
                    <ReactMarkdown source={member.description} />
                  </div>
                </div>
              </article>
            );
          })
        }
      </Query>
    </div>
  );
};

export default CommitteeMembers;
