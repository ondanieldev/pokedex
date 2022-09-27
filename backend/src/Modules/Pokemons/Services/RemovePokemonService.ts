import HttpError from '@Shared/Infra/Http/Errors/HttpError';
import { inject, injectable } from 'tsyringe';

import RemovedPokemon from '../Infra/TypeORM/Entities/RemovedPokemon';
import IRemovedPokemonsRepository from '../Repositories/IRemovedPokemonsRepository';

interface IResponse {
  pokemon: RemovedPokemon;
}

@injectable()
class RemovePokemonService {
  constructor(
    @inject('RemovedPokemonsRepository')
    private removedPokemonsRepository: IRemovedPokemonsRepository,
  ) {}

  public execute = async (name: string): Promise<IResponse> => {
    const alreadyRemoved = await this.removedPokemonsRepository.findOne(name);
    if (alreadyRemoved) {
      throw new HttpError('This pokémon is already removed');
    }

    const pokemon = await this.removedPokemonsRepository.create(name);

    return {
      pokemon,
    };
  };
}

export default RemovePokemonService;
