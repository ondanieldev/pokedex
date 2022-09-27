import RemovePokemonService from '@Modules/Pokemons/Services/RemovePokemonService';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

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
}

export default PokemonsController;
