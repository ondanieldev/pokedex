import RemovedPokemon from '../Infra/TypeORM/Entities/RemovedPokemon';

interface IRemovedPokemonsRepository {
  findOne(id: number): Promise<RemovedPokemon | undefined>;
  create(id: number): Promise<RemovedPokemon>;
}

export default IRemovedPokemonsRepository;
