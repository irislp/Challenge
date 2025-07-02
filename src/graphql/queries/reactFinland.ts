import { gql } from '@apollo/client';

export const GET_REACT_FINLAND_DATA = gql`
  query GetReactFinlandData {
    series {
      name
      conferences {
        name
        year
        startDate
        endDate
        organizers {
          name
        }
        sessions {
          title
          description
          speakers {
            name
            about
            image {
              url
            }
            socials {
              type
              link
            }
          }
        }
      }
    }
  }
`;
