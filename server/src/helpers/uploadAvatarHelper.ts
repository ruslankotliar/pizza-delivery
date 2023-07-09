import { Request } from 'express';
import s3 from '../aws/awsConfig';

import multer from 'multer';
import multerS3 from 'multer-s3';
import EnvVars from '../constants/EnvVars';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
export const uploadUserAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket: EnvVars.AWS.Bucket,
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
