import {
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
  } from 'graphql';
  
  export const CommentGraphQL = new GraphQLObjectType({
    name: 'comment',
    fields: {
      id: { type: GraphQLID },
      text: { type: GraphQLString },
      like: { type: GraphQLInt },
      status: { type: GraphQLString },
      creationDate: { type: GraphQLString },
    },
  });
  
  export const CommentGraphQLMessage = new GraphQLObjectType({
    name: 'result',
    fields: {
      success: { type: GraphQLBoolean },
      message: { type: GraphQLString },
      comment: { type: CommentGraphQL },
      comments: { type: new GraphQLList(CommentGraphQL) },
    },
  });
  