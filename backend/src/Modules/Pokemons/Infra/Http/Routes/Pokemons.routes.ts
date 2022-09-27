import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import PokemonsController from '../Controllers/PokemonsController';

class PokemonsRoutes {
  public register = (): Router => {
    const pokemonsRoutes = Router();

    const pokemonsController = new PokemonsController();

    pokemonsRoutes.delete(
      '/:id',
      celebrate({
        [Segments.PARAMS]: {
          id: Joi.number().required(),
        },
      }),
      pokemonsController.delete,
    );

    pokemonsRoutes.get('/removed', pokemonsController.indexRemoved);

    return pokemonsRoutes;
  };
}

export default PokemonsRoutes;
