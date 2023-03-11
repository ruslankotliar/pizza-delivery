import EnvVars from '../constants/EnvVars';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: EnvVars.AWS.Access,
  secretAccessKey: EnvVars.AWS.Secret,
  region: EnvVars.AWS.Region,
});

export default AWS;
