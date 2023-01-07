import {
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInputObjectType
} from 'graphql';
import { myDataSource } from '../../common/config/app-data-source';
import { StatusEnum } from '../../common/enum/status.enum';
/* import { FileGraphQL } from '../typeDefs/story';
import { File } from '../../models/file.entity'; */
import { UserGraphQL } from '../typeDefs/user';
import { User } from '../../models/user.entity';
import bcrypt from 'bcrypt';
import {
    generateUsername,
    getById
} from '../../modules/users/users.controller';
import { generateTokens } from '../../modules/refresh-tokens/refresh-token.controller';
import { LoginGraphQL } from '../typeDefs/auth';

export const CREATE_USER = {
    type: LoginGraphQL,
    args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        image: { type: GraphQLInt },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    resolve: async (parent: any, args: any) => {
        const { firstName, lastName, /* image, */ password, email } = args;
        const userRepository = myDataSource.getRepository(User);

        let data = {
            firstName,
            lastName,
            email,
            password,
            username: '',
            status: StatusEnum.active
        };
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        data = {
            ...data,
            password: hash
        };

        const username: any = await generateUsername(firstName, lastName);

        data = {
            ...data,
            username
        };

        //   const file = myDataSource.getRepository(File).findOne({where: { id: image }});

        //   if (!file) {
        //     return {
        //       success: false,
        //       message: 'Story could not be updated, an error has occurred.',  optional code for default image
        //     };
        //   }

        const dataToSave = userRepository.create(data);
        const user = await userRepository.save(dataToSave);
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

export const UPDATE_USER = {
    type: UserGraphQL,
    args: {
        id: { type: GraphQLID },
        body: {
            type: new GraphQLInputObjectType({
                name: 'userBody',
                fields: {
                    firstName: { type: GraphQLString },
                    lastName: { type: GraphQLString },
                    username: { type: GraphQLString },
                    status: { type: GraphQLString },
                    image: { type: GraphQLInt },
                    password: { type: GraphQLString },
                    email: { type: GraphQLString }
                }
            })
        }
    },
    resolve: async (parent: any, { id, body }: any) => {
        const {
            firstName,
            lastName,
            /* image, */
            password,
            email,
            username,
            status
        } = body;
        const userRepository = myDataSource.getRepository(User);
        let data = {
            firstName,
            lastName,
            email,
            password,
            username,
            status
        };

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        data = {
            ...data,
            password: hash
        };

        const userExist = await getById(id);
        if (userExist) {
            await userRepository.update({ id }, data);
            const user = await getById(id);
            if (user) {
                return {
                    success: true,
                    message: 'User updated',
                    user
                };
            } else {
                return {
                    success: false,
                    message: 'User could not be updated, an error has occurred.'
                };
            }
        } else {
            return {
                success: false,
                message: 'User could not be updated, an error has occurred.'
            };
        }
    }
};

export const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt }
    },
    resolve: async (parent: any, args: any) => {
        const { id } = args;
        const userRepository = myDataSource.getRepository(User);
        const affected = await userRepository.delete({ id });
        return affected.affected === 1;
    }
};
