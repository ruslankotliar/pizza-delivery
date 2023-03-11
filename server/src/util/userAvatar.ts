import { BUCKET_KEY } from '../constants/app';
import { v4 as uuidv4 } from 'uuid';
import AWS from '../aws/awsConfig';

export const uploadUserAvatar = async (): Promise<string> => {
  const avatarKey = `avatars/${uuidv4()}.jpeg`; // Unique key for the avatar file
  const signedUrl = await new AWS.S3().getSignedUrlPromise('putObject', {
    Bucket: BUCKET_KEY,
    Key: avatarKey,
    ContentType: 'image/jpeg', // Or the appropriate MIME type for your image
    ACL: 'authenticated-read', // Allows public access to the uploaded file
    Expires: 300, // URL expires after 5 minutes (adjust as needed)
  });
  return signedUrl;
};
