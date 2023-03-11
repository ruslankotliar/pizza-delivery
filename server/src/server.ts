import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import session, { SessionData } from 'express-session';
import { typeDefs } from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';
import logger from 'jet-logger';

import 'express-async-errors';

import EnvVars from './constants/EnvVars';
import HttpStatusCodes from './constants/HttpStatusCodes';

import { NodeEnvs } from './constants/misc';

interface Session extends SessionData {
  userId?: string;
}

// **** Variables **** //
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  context: ({ req, res }) => {
    const session = req.session as Session;
    return { req, res, userId: session.userId };
  },
});

// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

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

// Add APIs, must be after middleware
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

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

export default app;
