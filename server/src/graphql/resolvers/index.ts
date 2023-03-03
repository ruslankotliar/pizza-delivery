/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../models/User';
import { AuthenticationError } from 'apollo-server-express';
import AWS from '../../aws/awsConfig';
import { v4 as uuidv4 } from 'uuid';

interface MyContext {
  req: Request;
  res: Response;
  userId: string;
}

type RegisterArgs = {
  input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatar: string;
  };
};

type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | undefined;
};

type Resolvers = {
  Query: {
    me: (_: any, __: any, context: any) => Promise<UserResponse>;
  };
  Mutation: {
    register: (_: any, args: RegisterArgs) => Promise<UserResponse>;
    login: (
      _: any,
      args: { email: string; password: string },
      context: any
    ) => Promise<UserResponse>;
  };
};

export const resolvers: Resolvers = {
  Query: {
    me: async (_: Request, __: Response, { userId }: MyContext) => {
      if (!userId) {
        throw new AuthenticationError('Unauthorized');
      }

      const user = await User.findById(userId);

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      return {
        id: user._id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      };
    },
  },
  Mutation: {
    register: async (_, { input }: RegisterArgs) => {
      const { firstName, lastName, email, password, confirmPassword, avatar } =
        input;
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('Email already registered');
      }

      const user = new User({ firstName, lastName, email, password });

      if (avatar) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/restrict-template-expressions
        const avatarKey = `avatars/${uuidv4()}.jpeg`; // Unique key for the avatar file
        const signedUrl = await new AWS.S3().getSignedUrlPromise('putObject', {
          Bucket: 'pizza-delivery-5834925638',
          Key: avatarKey,
          ContentType: 'image/jpeg', // Or the appropriate MIME type for your image
          ACL: 'public-read', // Allows public access to the uploaded file
          Expires: 300, // URL expires after 5 minutes (adjust as needed)
        });

        user.avatar = signedUrl;
      } else {
        // generate random avatar here
        user.avatar = 'fasdfasd';
      }

      await user.save();

      return {
        id: user._id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      };
    },

    login: async (_, args, { req }) => {
      const { email, password } = args;

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await user.comparePassword(password);

      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      // Here you can generate a JWT token and set it as a cookie in the response.
      // You can also set the user ID in the context for authentication and authorization.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      req.session.userId = user.id;

      return {
        id: user._id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      };
    },
  },
};
