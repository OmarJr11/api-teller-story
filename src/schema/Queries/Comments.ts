import { GraphQLList, GraphQLInt } from 'graphql';
import { Not } from 'typeorm';
import { myDataSource } from '../../common/config/app-data-source';
import { StatusEnum } from '../../common/enum/status.enum';
import { Comment } from '../../models/comment.entity';
import { formatComment, formatComments } from '../../modules/comments/comments.controller';
import { CommentGraphQL } from '../typeDefs/comment';

export const GET_ALL_COMMENTS = {
  type: new GraphQLList(CommentGraphQL),
  resolve: async () => {
    const commentRepository = myDataSource.getRepository(Comment);
    const comments = await commentRepository.find({
      where: {
        status: Not(StatusEnum.deleted),
      },
      relations: ['file'],
      order: {
        creationDate: "DESC",
      }
    });
    return formatComments(comments);
  },
};

export const GET_COMMENT_BY_ID = {
  type: CommentGraphQL,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent: any, args: any) => {
    const { id } = args;
    const commentRepository = myDataSource.getRepository(Comment);
    const comment = await commentRepository.findOneOrFail({
      where: {
        id,
        status: Not(StatusEnum.deleted),
      },
    });
    return formatComment(comment);
  },
};
