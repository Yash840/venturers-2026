import { v2 as cloudinary } from 'cloudinary';
import { type Request, type Response, type NextFunction } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { Readable } from 'stream';

import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env'), debug: true });

cloudinary.config({
  secure: true
});


cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_API_KEY}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next();
    }
    
    const uploadPromise = new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result.secure_url);
          } else {
            reject(new Error('Cloudinary upload failed.'));
          }
        }
      );

      const readableStream = new Readable();
      readableStream.push(req.file.buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });

    const secureUrl = await uploadPromise;
    req.body.paymentSSLink = secureUrl;
    next();
  } catch (error) {
    next(error);
  }
};