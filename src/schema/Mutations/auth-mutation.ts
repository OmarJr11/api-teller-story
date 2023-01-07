import {
    GraphQLInt,
    GraphQLString} from 'graphql';
import bcrypt from 'bcrypt';
import {
    getByEmail} from '../../modules/users/users.controller';
import { generateTokens, refreshToken } from '../../modules/refresh-tokens/refresh-token.controller';
import { LoginGraphQL } from '../typeDefs/auth';

export const LOGIN_USER = {
    type: LoginGraphQL,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (parent: any, args: any) => {
        const { password, email } = args;
        const user = await getByEmail(email);
        const userPassword = user.password ? user.password : '';
        delete user.password;
        if (!user || !bcrypt.compareSync(password, userPassword)) {
            return {
                success: false,
                message: 'Invalid username or password.'
            };
        }

        const tokenDB = await generateTokens(user, 'User');        
        if(tokenDB.token === '' || tokenDB.refresh === '') {
            return {
                code: 500,
                status: false,
                message: 'Story could not be created, an error has occurred.',
            };
        }
        return { user, token: { ...tokenDB } };
    }
};

export const REFRESH_TOKEN = {
    type: LoginGraphQL,
    args: {
        idUser: { type: GraphQLInt },
        token: { type: GraphQLString },
        refresh: { type: GraphQLString },
    },
    resolve: async (parent: any, args: any) => {
        const { idUser, token, refresh } = args;
        const tokenDB = await refreshToken(idUser, token, refresh);
        if(!tokenDB.user || !tokenDB.tokens.token || !tokenDB.tokens.token) {
            return {
                code: 500,
                status: false,
                message: 'Refresh token not be created, an error has occurred.',
            };
        }
        return { user: tokenDB.user, token: { token: tokenDB.tokens.token, refresh: tokenDB.tokens.refresh } };
    }
};