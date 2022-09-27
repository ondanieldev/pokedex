import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

import IndexRemovedPokemonsService from '@Modules/Pokemons/Services/IndexRemovedPokemonsService';
import RemovePokemonService from '@Modules/Pokemons/Services/RemovePokemonService';

class PokemonsController {
  public delete = async (
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> => {
    const { id } = request.params;

    const removePokemonService = container.resolve(RemovePokemonService);

    const result = await removePokemonService.execute(Number(id));

    return response.status(200).json(result);
  };

  public indexRemoved = async (
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> => {
    const indexRemovedPokemonsService = container.resolve(
      IndexRemovedPokemonsService,
    );

    const result = await indexRemovedPokemonsService.execute();

    return response.status(200).json(result);
  };
}

export default PokemonsController;
