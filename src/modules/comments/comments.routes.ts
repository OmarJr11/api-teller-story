import { Router } from 'express';
import {
  create,
  findAll,
  findById,
  remove,
  update
} from './comments.controller';

const routerComments = Router();

routerComments.post('', create);
routerComments.get('', findAll);
routerComments.get('/:idComment', findById);
routerComments.put('/:idComment', update);
routerComments.delete('/:idComment', remove);

export default routerComments;
