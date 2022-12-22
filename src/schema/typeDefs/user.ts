import { FileGraphQL } from './story';
import { GraphQLString, GraphQLID, GraphQLObjectType } from 'graphql';

export const UserGraphQL = new GraphQLObjectType({
    name: 'user',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        image: { type: FileGraphQL },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        status: { type: GraphQLString },
        creationDate: { type: GraphQLString }
    }
});
