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

  public execute = async (id: number): Promise<IResponse> => {
    const alreadyRemoved = await this.removedPokemonsRepository.findOne(id);
    if (alreadyRemoved) {
      throw new HttpError('This pokemon is already removed');
    }

    const pokemon = await this.removedPokemonsRepository.create(id);

    return {
      pokemon,
    };
  };
}

export default RemovePokemonService;
