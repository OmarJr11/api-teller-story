import express from 'express';
import app from './app';
import 'reflect-metadata';
import { myDataSource } from './common/config/app-data-source';
import { routerFile } from './modules/files/file.routes';
const multer = require('multer');
const cloudinary = require('cloudinary');
const path = require('path');

async function main() {
  try {
    await myDataSource.initialize();
    cloudinary.config({ 
      cloud_name: process.env.CLOUD_NAME, 
      api_key: process.env.API_KEY,  
      api_secret: process.env.API_SECRET, 
    });
    app.use(express.json());
    app.use(express.urlencoded({ extended: false })); //Middleware for parsing requests to json
    const storage = multer.diskStorage(({
      filename: (req: any, file: any, cb: (arg0: null, arg1: number) => void) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
      }
    }))
    app.use(multer({storage}).single('image'));
    app.use('/upload', routerFile); //We use the routers
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `We are online and listening on port ${process.env.PORT || 8000}`
      ); //We initialize the server
    });
  } catch (error) {
    console.log(error);
  }
}

main();
