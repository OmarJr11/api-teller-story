import { Response } from 'express';
import { Repository } from 'typeorm';
import { myDataSource } from '../../common/config/app-data-source';
import { File } from '../../models/file.entity';
const cloudinary = require('cloudinary');
  
export const upload = async (req: any, res: Response) => {
    try {
        const cloud = await cloudinary.v2.uploader.upload(req.file.path);    
        const fileRepository = myDataSource.getRepository(File);
        const data  = {
            filename: await generateFilename(fileRepository),
            extension: req.body.extension,
            url: cloud.url,
        };
        const dataToSave = fileRepository.create(data);
        const file = await fileRepository.save(dataToSave);
        const response = {
            success: true,
            message: 'File upload',
            file: file,
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


const generateFilename = async (file: Repository<File>)=> {
    let filename = generateRandomCodeByLength(30);
  
    // constant to the loop
    let i = 0;
    do {
        // Verifying the newly generated code is not in the database
        const existThisName = await file.findOne({where: {filename}});
  
        // if exist stop the loop
        i = existThisName ? 1 : 0;
  
        // get other filename
        if (i > 0) {
          filename = generateRandomCodeByLength(30);
        }
    } while (i === 1);
  
    return filename;
}

function generateRandomCodeByLength(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

  