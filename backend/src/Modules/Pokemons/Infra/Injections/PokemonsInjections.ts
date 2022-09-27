import { container } from 'tsyringe';

import IRemovedPokemonsRepository from '@Modules/Pokemons/Repositories/IRemovedPokemonsRepository';
import RemovedPokemonsRepository from '../TypeORM/Repositories/RemovedPokemonsRepository';

class PokemonsInjections {
  public register(): void {
    container.register<IRemovedPokemonsRepository>(
      'RemovedPokemonsRepository',
      RemovedPokemonsRepository,
    );
  }
}

export default PokemonsInjections;
