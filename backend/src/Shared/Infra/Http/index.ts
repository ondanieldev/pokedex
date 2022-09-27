import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { configure, getLogger } from 'log4js';
import { errors as celebrateErrors } from 'celebrate';

import apiConfig from '@Shared/Config/apiConfig';
import PokemonsInjections from '@Modules/Pokemons/Infra/Injections/PokemonsInjections';
import PokemonsRoutes from '@Modules/Pokemons/Infra/Http/Routes/Pokemons.routes';
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

  // INJECTIONS
  const pokemonsInjections = new PokemonsInjections();
  pokemonsInjections.register();

  // SERVER
  const app = express();

  // SERVER: pre-routes middlewares
  app.use(express.json());
  app.use(cors());

  // SERVER: routes
  const pokemonsRoutes = new PokemonsRoutes();
  app.use('/pokemons', pokemonsRoutes.register());

  // SERVER: post-routes middlewares
  const errorsMiddleware = new ErrorsMiddleware();
  app.use(celebrateErrors());
  app.use(errorsMiddleware.execute);

  // SERVER: start
  app.listen(apiConfig.port, () => {
    logger.info(`Server running on http://localhost:${apiConfig.port}`);
  });
};

server();
