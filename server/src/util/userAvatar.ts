import { Request } from 'express';
import { BUCKET_KEY } from '../constants/app';
import s3 from '../aws/awsConfig';

import multer from 'multer';
import multerS3 from 'multer-s3';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
export const uploadUserAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_KEY,
    acl: 'public-read', // Set the appropriate permissions for the uploaded file

    key: function (
      request: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, key: string) => void
    ) {
      cb(null, Date.now().toString()); // Use a unique key for the uploaded file
    },
  }),
});

// export const uploadUserAvatar = async (): Promise<string> => {
//   // Set up multer middleware for handling multipart/form-data
//   multer({
//     storage: multerS3({
//       s3: new AWS.S3(),
//       bucket: BUCKET_KEY,
//       acl: 'public-read', // Set the appropriate permissions for the uploaded file
//       key: function (
//         request: Request,
//         file: Express.Multer.File,
//         cb: (error: Error | null, key: string) => void
//       ) {
//         cb(null, Date.now().toString()); // Use a unique key for the uploaded file
//       },
//     }),
//   });

//   const avatarKey = `avatars/${uuidv4()}.jpeg`; // Unique key for the avatar file
//   const signedUrl = await new AWS.S3().getSignedUrlPromise('putObject', {
//     Bucket: BUCKET_KEY,
//     Key: avatarKey,
//     ContentType: 'image/jpeg', // Or the appropriate MIME type for your image
//     ACL: 'authenticated-read', // Allows public access to the uploaded file
//     Expires: 604800, // URL expires after 5 minutes (adjust as needed)
//   });
//   return signedUrl;
// };
