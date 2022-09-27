import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { configure, getLogger } from 'log4js';
import { errors as celebrateErrors } from 'celebrate';

import apiConfig from '@Shared/Config/apiConfig';
import TypeORM from '../TypeORM';
import ErrorsMiddleware from './Middlewares/ErrorsMiddleware';

configure(
  `./src/Shared/Config/log4js-${
    process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
  }.json`,
);

const logger = getLogger('server');

const server = async (): Promise<void> => {
  // DATABASE
  const typeORM = new TypeORM();
  await typeORM.setup();

  // EXPRESS
  const app = express();

  // EXPRESS: pre-routes middlewares
  app.use(express.json());
  app.use(cors());

  // EXPRESS: post-routes middlewares
  const errorsMiddleware = new ErrorsMiddleware();
  app.use(celebrateErrors());
  app.use(errorsMiddleware.execute);

  // SERVER
  app.listen(apiConfig.port, () => {
    logger.info(`Server running on http://localhost:${apiConfig.port}`);
  });
};

server();
