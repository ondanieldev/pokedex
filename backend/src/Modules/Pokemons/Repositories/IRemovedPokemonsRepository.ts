import RemovedPokemon from '../Infra/TypeORM/Entities/RemovedPokemon';

interface IRemovedPokemonsRepository {
  find(): Promise<RemovedPokemon[]>;
  findOne(name: string): Promise<RemovedPokemon | undefined>;
  create(name: string): Promise<RemovedPokemon>;
}

export default IRemovedPokemonsRepository;
