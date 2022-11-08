import { Request, Response } from 'express';
import { Not } from 'typeorm';
import { myDataSource } from '../../common/config/app-data-source';
import { StatusEnum } from '../../common/enum/status.enum';
import { Story } from '../../models/story.entity';
import { CreateStoryDto } from '../../common/dtos/create-story.dto';
import { UpdateStoryDto } from '../../common/dtos/update-story.dto';

export function formatStories(stories: Story[]): Story[] {
  return stories.map((story) => formatStory(story));
}

export function formatStory(story: Story): Story {
  story.creationDate = story.creationDate?.toString();
  story.id = Number(story.id);
  delete story.modificationDate;
  delete story.creator;
  delete story.modifier;
  return story;
}

export async function getById(id: number): Promise<Story | undefined> {
  const storyRepository = myDataSource.getRepository(Story);
  const story = await storyRepository.findOneOrFail({
    where: {
      id,
      status: Not(StatusEnum.deleted),
    },
    relations: ['file']
  });
  return story;
}

export async function getOneById(
  id: number,
  res: Response
): Promise<Story | undefined> {
  try {
    const storyRepository = myDataSource.getRepository(Story);
    const story = await storyRepository.findOneOrFail({
      where: {
        id,
        status: Not(StatusEnum.deleted),
      },
    });
    return story;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        code: 500,
        status: false,
        message: 'Story could not be created, an error has occurred.',
      });
    }
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data: CreateStoryDto = req.body;
    data.status = StatusEnum.active;
    const dataToSave = myDataSource.getRepository(Story).create(data);
    const story = await myDataSource.getRepository(Story).save(dataToSave);
    const response = {
      code: res.statusCode,
      success: true,
      story: formatStory(story ? story : new Story()),
    };
    return res.send(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        code: 500,
        status: false,
        message: 'Story could not be created, an error has occurred.',
      });
    }
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const stories = await myDataSource.getRepository(Story).find({
      where: {
        status: Not(StatusEnum.deleted),
      },
    });

    const response = {
      code: res.statusCode,
      success: true,
      story: formatStories(stories),
    };
    return res.send(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        code: 500,
        status: false,
        message: 'Story could not be created, an error has occurred.',
      });
    }
  }
};

export const findById = async (req: Request, res: Response) => {
  const id = Number(req.params.idStory);
  if (!id) {
    res.status(403).json({
      code: 403,
      status: false,
      message: 'You do not have permissions',
    });
  } else {
    try {
      const story = await getOneById(id, res);
      if (!story) {
        res.status(404).json({
          code: 404,
          status: false,
          message: 'Story not found',
        });
      } else {
        const response = {
          code: res.statusCode,
          success: true,
          story: formatStory(story),
        };
        return res.send(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          code: 500,
          status: false,
          message: 'Story could not be created, an error has occurred.',
        });
      }
    }
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.idStory);
  const data: UpdateStoryDto = req.body;
  if (!id) {
    res.status(403).json({
      code: 403,
      status: false,
      message: 'You do not have permissions',
    });
  } else {
    try {
      const story = await getOneById(id, res);
      if (!story) {
        res.status(404).json({
          code: 404,
          status: false,
          message: 'Story not found',
        });
      } else {
        const storyRepository = myDataSource.getRepository(Story);
        await storyRepository.update({ id }, data).catch(() => {
          res.status(404).json({
            code: 404,
            status: false,
            message: 'Story could not be created, an error has occurred.',
          });
        });
        const storyUpdate = await getOneById(id, res);
        const response = {
          code: res.statusCode,
          success: true,
          story: storyUpdate,
        };
        return res.send(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          code: 500,
          status: false,
          message: 'Story could not be created, an error has occurred.',
        });
      }
    }
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.idStory);
  if (!id) {
    res.status(403).json({
      code: 403,
      status: false,
      message: 'You do not have permissions',
    });
  } else {
    try {
      const story = await getOneById(id, res);
      if (!story) {
        res.status(404).json({
          code: 404,
          status: false,
          message: 'Story not found',
        });
      } else {
        const storyRepository = myDataSource.getRepository(Story);
        await storyRepository.delete({ id });
        const response = {
          code: res.statusCode,
          success: true,
          message: 'Story delete',
        };
        return res.send(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          code: 500,
          status: false,
          message: 'Story could not be created, an error has occurred.',
        });
      }
    }
  }
};
