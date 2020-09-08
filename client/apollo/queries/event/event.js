import gql from "graphql-tag";

export const EVENTS_QUERY = gql`
  query Events {
    events(sort: "date_start:desc") {
      id
      title
      summary
      date_start
      date_end
      description
      level
      cancelled
      cancel_reason
      type {
        colour
        name
        description
      }
      thumbnail {
        url
      }
    }
  }
`;

export const EVENTS_FIND_ONE = gql`
  query EventsOne($id: ID!) {
    event(id: $id) {
      id
      title
      summary
      date_start
      date_end
      description
      level
      cancelled
      cancel_reason
      attendees {
        given_name
        picture {
          url
        }
        level
      }
      files {
        name
        mime
        url
      }
      type {
        colour
        name
        description
      }
      thumbnail {
        url
      }
      location
    }
  }
`;
