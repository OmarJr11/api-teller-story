import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import {
  CREATE_STORY,
  DELETE_STORY,
  UPDATE_STORY,
} from './Mutations/stories-mutation';
import { GET_ALL_Story, GET_STORY_BY_ID } from './Queries/Stories';
import { GREETING } from './Queries/Greeting';
import { 
  CREATE_COMMENT,
  DELETE_COMMENT,
  DISLIKE_COMMENT,
  LIKE_COMMENT,
  UPDATE_COMMENT
} from './Mutations/Comments-mutation';
import {
  GET_ALL_COMMENTS,
  GET_COMMENT_BY_ID
} from './Queries/Comments';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    greeting: GREETING,
    getAllStory: GET_ALL_Story,
    getStoryById: GET_STORY_BY_ID,
    getAllComment: GET_ALL_COMMENTS,
    getCommentById: GET_COMMENT_BY_ID,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStory: CREATE_STORY,
    deleteStory: DELETE_STORY,
    updateStory: UPDATE_STORY,
    createComment: CREATE_COMMENT,
    deleteComment: DELETE_COMMENT,
    updateComment: UPDATE_COMMENT,
    likeComment: LIKE_COMMENT,
    dislikeComment: DISLIKE_COMMENT,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
