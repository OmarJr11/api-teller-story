import {
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInputObjectType,
  } from 'graphql';
import { myDataSource } from '../../common/config/app-data-source';
import { StatusEnum } from '../../common/enum/status.enum';
import { Comment } from '../../models/comment.entity';
import { CreateCommentDto } from '../../common/dtos';
import { formatComment, getById } from '../../modules/comments/comments.controller';
import { UpdateCommentDto } from '../../common/dtos/edit-comment.dto';
import { CommentGraphQL, CommentGraphQLMessage } from '../typeDefs/comment';
  
  export const CREATE_COMMENT = {
    type: CommentGraphQL,
    args: {
      text: { type: GraphQLString },
    },
    resolve: async (parent: any, args: any) => {    
      const { text } = args;
      const commentRepository = myDataSource.getRepository(Comment);    
      const data: CreateCommentDto = { text };
      data.status = StatusEnum.active;
      
      const dataToSave = commentRepository.create(data);
      const comment = formatComment(await commentRepository.save(dataToSave));
      return await getById(Number(comment.id));
    },
  };
  
  export const UPDATE_COMMENT = {
    type: CommentGraphQLMessage,
    args: {
      id: { type: GraphQLID },
      body: {
        type: new GraphQLInputObjectType({
            name: 'commentBody',
            fields: {
                text: { type: GraphQLString },
            },
        }),
      },
    },
    resolve: async (parent: any, { id, body }: any) => {
      const { text } = body;
      const commentRepository = myDataSource.getRepository(Comment);
      const data: UpdateCommentDto = {
        text,
      };
      const commentExist = await getById(id);
      if (commentExist) {
        await commentRepository.update({ id }, data);
        const comment = await getById(id);
        if (comment) {
          return {
            success: true,
            message: 'Comment updated',
            comment: formatComment(comment),
          };
        } else {
          return {
            success: false,
            message: 'Comment could not be updated, an error has occurred.',
          };
        }
      } else {
        return {
          success: false,
          message: 'Comment could not be updated, an error has occurred.',
        };
      }
    },
  };
  
  export const LIKE_COMMENT = {
    type: CommentGraphQLMessage,
    args: {
        id: { type: GraphQLID },
    },
    resolve: async (parent: any, { id }: any) => {
      const commentRepository = myDataSource.getRepository(Comment);
      const commentExist = await getById(id);
      if (commentExist) {
        await commentRepository.update({ id }, {like: commentExist.like + 1});
        const comment = await getById(id);
        if (comment) {
          return {
            success: true,
            message: 'Comment updated',
            comment: formatComment(comment),
          };
        } else {
          return {
            success: false,
            message: 'Comment could not be updated, an error has occurred.',
          };
        }
      } else {
        return {
          success: false,
          message: 'Comment could not be updated, an error has occurred.',
        };
      }
    },
  };

  export const DISLIKE_COMMENT = {
    type: CommentGraphQLMessage,
    args: {
        id: { type: GraphQLID },
    },
    resolve: async (parent: any, { id }: any) => {
      const commentRepository = myDataSource.getRepository(Comment);
      const commentExist = await getById(id);
      if (commentExist) {
        await commentRepository.update({ id }, {like: commentExist.like - 1});
        const comment = await getById(id);
        if (comment) {
          return {
            success: true,
            message: 'Comment updated',
            comment: formatComment(comment),
          };
        } else {
          return {
            success: false,
            message: 'Comment could not be updated, an error has occurred.',
          };
        }
      } else {
        return {
          success: false,
          message: 'Comment could not be updated, an error has occurred.',
        };
      }
    },
  };

export const DELETE_COMMENT = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent: any, { id }: any) => {
    const commentRepository = myDataSource.getRepository(Comment);
    const commentExist = await getById(id);
    if (commentExist) {
      await commentRepository.update({ id }, {status: StatusEnum.deleted});
      const comment = await getById(id);
      if (comment) {
        return {
          success: true,
          message: 'Comment deleted',
        };
      } else {
        return {
          success: false,
          message: 'Comment could not be deleted, an error has occurred.',
        };
      }
    } else {
      return {
        success: false,
        message: 'Comment could not be deleted, an error has occurred.',
      };
    }
  },
};