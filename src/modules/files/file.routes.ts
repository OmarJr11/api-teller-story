import { Router } from 'express';
import { upload } from './file.controller';

export const routerFile = Router();

routerFile.post('/image', upload);