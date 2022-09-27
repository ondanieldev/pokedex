import { inject, injectable } from 'tsyringe';

import RemovedPokemon from '../Infra/TypeORM/Entities/RemovedPokemon';
import IRemovedPokemonsRepository from '../Repositories/IRemovedPokemonsRepository';

interface IResponse {
  removedPokemons: RemovedPokemon[];
}

@injectable()
class IndexRemovedPokemonsService {
  constructor(
    @inject('RemovedPokemonsRepository')
    private removedPokemonsRepository: IRemovedPokemonsRepository,
  ) {}

  public execute = async (): Promise<IResponse> => {
    const removedPokemons = await this.removedPokemonsRepository.find();

    return {
      removedPokemons,
    };
  };
}

export default IndexRemovedPokemonsService;
