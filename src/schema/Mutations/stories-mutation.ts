import {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
} from 'graphql';
import { myDataSource } from '../../common/config/app-data-source';
import { StatusEnum } from '../../common/enum/status.enum';
import { Story } from '../../models/story.entity';
import { CreateStoryDto } from '../../common/dtos/create-story.dto';
import { UpdateStoryDto } from '../../common/dtos/update-story.dto';
import { formatStory, getById } from '../../modules/stories/stories.controller';
import { StoryGraphQL, StoryGraphQLMessage } from '../typeDefs/story';
import { File } from '../../models/file.entity';

export const CREATE_STORY = {
  type: StoryGraphQL,
  args: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    image: { type: GraphQLInt },
  },
  resolve: async (parent: any, args: any) => {    
    const { title, text, image } = args;
    const storyRepository = myDataSource.getRepository(Story);    
    const data: CreateStoryDto = {
      title,
      text,
      image
    };
    data.status = StatusEnum.active;
    const file = myDataSource.getRepository(File).findOne({where: { id: image }});
    
    if (!file) {
      return {
        success: false,
        message: 'Story could not be updated, an error has occurred.',
      };
    }
    const dataToSave = storyRepository.create(data);
    const story = formatStory(await storyRepository.save(dataToSave));
    return await getById(Number(story.id));
  },
};

export const UPDATE_STORY = {
  type: StoryGraphQLMessage,
  args: {
    id: { type: GraphQLID },
    body: {
      type: new GraphQLInputObjectType({
        name: 'storyBody',
        fields: {
          title: { type: GraphQLString },
          text: { type: GraphQLString },
          image: { type: GraphQLInt },
        },
      }),
    },
  },
  resolve: async (parent: any, { id, body }: any) => {
    const { title, text, image } = body;
    const storyRepository = myDataSource.getRepository(Story);
    const data: UpdateStoryDto = {
      title,
      text,
      image
    };
    const storyExist = await getById(id);
    if (storyExist) {
      await storyRepository.update({ id }, data);
      const story = await getById(id);
      if (story) {
        return {
          success: true,
          message: 'Story updated',
          story: formatStory(story),
        };
      } else {
        return {
          success: false,
          message: 'Story could not be updated, an error has occurred.',
        };
      }
    } else {
      return {
        success: false,
        message: 'Story could not be updated, an error has occurred.',
      };
    }
  },
};

export const DELETE_STORY = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent: any, args: any) => {
    const { id } = args;
    const storyRepository = myDataSource.getRepository(Story);
    const affected = await storyRepository.delete({ id });
    return affected.affected === 1;
  },
};
