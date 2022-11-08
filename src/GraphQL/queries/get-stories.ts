import { gql } from '@apollo/client';

export const GET_ALL_STORY = gql`
  query {
    getAllStory {
      id
      title
      text
      creationDate
      like
      file {
        url
      }
    }
  }
`;
