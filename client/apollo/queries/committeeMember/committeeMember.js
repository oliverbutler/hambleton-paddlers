import gql from "graphql-tag";

const COMMITTEE_MEMBER_QUERY = gql`
  query CommitteeMember {
    committee {
      given_name
      family_name
      committee {
        role
        summary
        description
        order
      }
      picture {
        url
      }
    }
  }
`;

export { COMMITTEE_MEMBER_QUERY };
