enum NodeEnvs {
  Dev = 'development',
  Test = 'test',
  Production = 'production',
}

const UPLOAD_AVATAR = '/uploadAvatar';
const GOOGLE_API = 'https://www.googleapis.com/oauth2/v3/userinfo';

const RESPONSE_MESSAGE = {
  USER: {
    FAIL: {
      NOT_EXIST: 'User not found',
      NOT_AUTH: 'Unauthorized',
      PASSWORDS_NOT_MATCH: 'Passwords do not match',
      EMAIL_EXISTS: 'Email already registered',
      INVALID_CRED: 'Invalid email or password',
    },
    SUCCESS: {
      LOGIN: 'Logged in successfully',
      AVATAR: 'Avatar downloaded successfully',
    },
  },
};

const RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export {
  NodeEnvs,
  RESPONSE_MESSAGE,
  RESPONSE_STATUS,
  UPLOAD_AVATAR,
  GOOGLE_API,
};
