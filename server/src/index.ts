import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import { connect } from 'mongoose';

import EnvVars from './constants/EnvVars';
import server from './server';

// **** Run **** //

const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString();

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const MONGODB_URI = `mongodb+srv://${EnvVars.Mongo.Name}:${EnvVars.Mongo.Password}@pizza-delivery.skygb5r.mongodb.net/?retryWrites=true&w=majority`;

server.listen(EnvVars.Port, async () => {
  logger.info(SERVER_START_MSG);
  await connect(MONGODB_URI);
  logger.info('Connected to database');
});
