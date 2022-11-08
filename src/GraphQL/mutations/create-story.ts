import { gql } from '@apollo/client';

export const CREATE_STORY = gql`
  mutation createStory($title: String!, $text: String!, $image: Int!) {
    createStory(title: $title, text: $text, image: $image) {
      title
      text
      id
    }
  }
`;
