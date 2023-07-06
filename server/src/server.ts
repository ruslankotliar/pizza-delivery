import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloError, ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';
import logger from 'jet-logger';
import cors from 'cors';

import 'express-async-errors';

import EnvVars from './constants/EnvVars';
import HttpStatusCodes from './constants/HttpStatusCodes';

import { NodeEnvs, UPLOAD_AVATAR } from './constants';
import { getSessionData } from './util/SessionUtil';
import { uploadUserAvatar } from './helpers/uploadAvatarHelper';

// **** Variables **** //
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  context: async ({ req, res }) => {
    const userId = await getSessionData(req);

    return {
      req,
      res,
      userId,
    };
  },
  formatError: (error: ApolloError) => {
    const status: number = (error.extensions?.code ||
      HttpStatusCodes.BAD_REQUEST) as number;

    return {
      message: error.message,
      extensions: {
        code: status,
      },
    };
  },
});

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};
startServer();

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add error handler
app.use(
  (
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test) {
      logger.err(err, true);
    }

    const status = HttpStatusCodes.BAD_REQUEST;
    return res.status(status).json({ error: err.message });
  }
);

app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
interface CustomFile extends Express.Multer.File {
  location: string;
}

app.post(
  UPLOAD_AVATAR,
  uploadUserAvatar.single('image'),
  function (req: Request, res: Response) {
    if (req.file) {
      const imageUrl: string = (req.file as CustomFile).location;

      res.status(200).json(imageUrl);
    } else {
      // No file was uploaded
      res.status(400).json({ error: 'No file uploaded' });
    }
  }
);

export default app;
