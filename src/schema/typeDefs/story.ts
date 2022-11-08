import {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

export const FileGraphQL = new GraphQLObjectType({
  name: 'image',
  fields: {
    id: { type: GraphQLID },
    url: { type: GraphQLString },
    extension: { type: GraphQLString },
    filename: { type: GraphQLInt },
    creationDate: { type: GraphQLString },
  },
});

export const StoryGraphQL = new GraphQLObjectType({
  name: 'story',
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    like: { type: GraphQLInt },
    status: { type: GraphQLString },
    creationDate: { type: GraphQLString },
    file: { type: FileGraphQL },
  },
});

export const StoryGraphQLMessage = new GraphQLObjectType({
  name: 'result',
  fields: {
    success: { type: GraphQLBoolean },
    message: { type: GraphQLString },
    story: { type: StoryGraphQL },
    stories: { type: new GraphQLList(StoryGraphQL) },
  },
});
