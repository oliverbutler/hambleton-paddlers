import gql from "graphql-tag";

const COMMITTEE_MEMBER_QUERY = gql`
  query CommitteeMember {
    committeeMembers {
      role
      summary
      given_name
      family_name
      picture {
        url
      }
      description
    }
  }
`;

export default COMMITTEE_MEMBER_QUERY;
