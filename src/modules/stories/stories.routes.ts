import { Router } from 'express';
import {
  create,
  findAll,
  findById,
  remove,
  update,
} from './stories.controller';

const routerStories = Router();

routerStories.post('', create);
routerStories.get('', findAll);
routerStories.get('/:idStory', findById);
routerStories.get('/:idStory/comments', findById);
routerStories.put('/:idStory', update);
routerStories.delete('/:idStory', remove);

export default routerStories;
