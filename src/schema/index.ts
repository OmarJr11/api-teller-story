import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import {
  CREATE_STORY,
  DELETE_STORY,
  UPDATE_STORY,
} from './Mutations/stories-mutation';
import { GET_ALL_Story, GET_STORY_BY_ID } from './Queries/Stories';
import { GREETING } from './Queries/Greeting';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    greeting: GREETING,
    getAllStory: GET_ALL_Story,
    getStoryById: GET_STORY_BY_ID,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createStory: CREATE_STORY,
    deleteStory: DELETE_STORY,
    updateStory: UPDATE_STORY,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
