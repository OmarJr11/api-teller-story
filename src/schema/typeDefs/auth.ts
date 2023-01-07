import {
    GraphQLString,
    GraphQLObjectType,
  } from 'graphql';
import { UserGraphQL } from './user';

export const TokenGraphQL = new GraphQLObjectType({
    name: 'token',
    fields: {
      token: { type: GraphQLString },
      refresh: { type: GraphQLString },
    }
});

export const LoginGraphQL = new GraphQLObjectType({
    name: 'auth',
    fields: {
      user: { type: UserGraphQL },
      token: { type: TokenGraphQL },
    }
});
