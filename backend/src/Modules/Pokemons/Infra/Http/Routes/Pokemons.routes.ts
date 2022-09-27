import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PokemonsController from '../Controllers/PokemonsController';

class PokemonsRoutes {
  public register = (): Router => {
    const pokemonsRoutes = Router();

    const pokemonsController = new PokemonsController();

    pokemonsRoutes.delete(
      '/:name',
      celebrate({
        [Segments.PARAMS]: {
          name: Joi.string().required(),
        },
      }),
      pokemonsController.delete,
    );

    pokemonsRoutes.get('/removed', pokemonsController.indexRemoved);

    return pokemonsRoutes;
  };
}

export default PokemonsRoutes;
