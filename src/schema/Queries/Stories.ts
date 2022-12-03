import { GraphQLList, GraphQLInt } from 'graphql';
import { Not } from 'typeorm';
import { myDataSource } from '../../common/config/app-data-source';
import { StatusEnum } from '../../common/enum/status.enum';
import { Story } from '../../models/story.entity';
import {
  formatStories,
  formatStory,
} from '../../modules/stories/stories.controller';
import { StoryGraphQL } from '../typeDefs/story';

export const GET_ALL_Story = {
  type: new GraphQLList(StoryGraphQL),
  resolve: async () => {
    const storyRepository = myDataSource.getRepository(Story);
    const stories = await storyRepository.find({
      where: {
        status: Not(StatusEnum.deleted),
      },
      relations: ['file'],
      order: {
        creationDate: "DESC",
      }
    });
    return formatStories(stories);
  },
};

export const GET_STORY_BY_ID = {
  type: StoryGraphQL,
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent: any, args: any) => {
    const { id } = args;
    const storyRepository = myDataSource.getRepository(Story);
    const story = await storyRepository.findOneOrFail({
      where: {
        id,
        status: Not(StatusEnum.deleted),
      },
    });
    return formatStory(story);
  },
};
