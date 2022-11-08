import { Request, Response } from 'express';
import { myDataSource } from '../../common/config/app-data-source';
import { Comment } from '../../models/comment.entity';

//*Logic to create a comment

export const create = async (req: Request, res: Response) => {
  try {
    const dataSourceRepository = myDataSource.getRepository(Comment);
    const data: Comment = req.body;
    const dataToSave = dataSourceRepository.create(data);
    const comment = await dataSourceRepository.save(dataToSave);
    const response = {
      code: res.statusCode,
      success: true,
      comment: comment
    };

    return res.send(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        code: 500,
        status: false,
        message: 'Comment could not be created, an error has occurred.'
      });
    }
  }
};

//*Logic to get all comments

export const findAll = (req: Request, res: Response) => {
  try {
    const dataSourceRepository = myDataSource.getRepository(Comment);
    const comments = dataSourceRepository.find();

    const response = {
      code: res.statusCode,
      success: true,
      comments: comments
    };
    return res.send(response);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        code: 500,
        status: false,
        message: 'Comment could not be found or an error has occurred.'
      });
    }
  }
};

///*Logic to get comment by id

async function getOneById(
  id: number,
  res: Response
): Promise<Comment | undefined> {
  try {
    const commentsRepository = myDataSource.getRepository(Comment);
    const comment = commentsRepository.findOneOrFail({
      where: {
        id: id
      }
    });
    return comment;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        code: 500,
        status: false,
        message: 'Comment was not found.'
      });
    }
  }
}

export const findById = async (req: Request, res: Response) => {
  const id: number = Number(req.params.idComment);

  if (!id) {
    res.status(403).json({
      code: 403,
      status: false,
      message: 'You do not have permissions'
    });
  } else {
    try {
      const comment = await getOneById(id, res);

      if (!comment) {
        res.status(404).json({
          code: 404,
          status: false,
          message: 'comment not found'
        });
      } else {
        const response = {
          code: res.statusCode,
          success: true
        };
        return res.send(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          code: 500,
          status: false,
          message: 'Comment was no found or an error has occurred.'
        });
      }
    }
  }
};

//*Logic to update a comment

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.idComment);
  const data: Comment = req.body;
  try {
    if (!id) {
      return res.status(404).json({
        code: 404,
        status: false,
        message: 'Story not found'
      });
    } else {
      const commentsRepository = myDataSource.getRepository(Comment);
      await commentsRepository.update({ id }, data);

      const commentUpdate = await getOneById(id, res);
      const response = {
        code: res.statusCode,
        success: true,
        comment: commentUpdate
      };
      return res.send(response);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        code: 500,
        status: false,
        message: 'Comment could not be updated, an error has occurred.'
      });
    }
  }
};

//*Logic to remove a comment

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.idComment);
  if (!id) {
    return res.status(403).json({
      code: 403,
      status: false,
      message: 'You do not have permissions'
    });
  } else {
    try {
      const comment = await getOneById(id, res);

      if (!comment) {
        return res.status(404).json({
          code: 404,
          status: true,
          message: 'Comment not found.'
        });
      }

      const commentRepository = myDataSource.getRepository(Comment);
      await commentRepository.delete({ id });

      const response = {
        code: res.statusCode,
        success: true,
        message: 'Comment delted succesdully!'
      };

      return res.send(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          code: 500,
          status: false,
          message: 'Comment could not be deleted, an error has ocurred.'
        });
      }
    }
  }
};
