import gql from "graphql-tag";

const EVENTS_QUERY = gql`
  query Events {
    events(sort: "date_start:desc") {
      title
      summary
      date_start
      date_end
      description
      thumbnail {
        url
      }
    }
  }
`;

export default EVENTS_QUERY;
