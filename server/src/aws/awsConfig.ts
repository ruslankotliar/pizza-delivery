import EnvVars from '../constants/EnvVars';
// import AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

// AWS.config.update({
//   accessKeyId: EnvVars.AWS.Access,
//   secretAccessKey: EnvVars.AWS.Secret,
//   region: EnvVars.AWS.Region,
// });

const s3 = new S3Client({
  credentials: {
    accessKeyId: EnvVars.AWS.Access,
    secretAccessKey: EnvVars.AWS.Secret,
  },
  region: EnvVars.AWS.Region,
});

export default s3;
