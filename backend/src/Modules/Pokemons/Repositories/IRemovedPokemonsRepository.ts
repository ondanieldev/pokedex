import RemovedPokemon from '../Infra/TypeORM/Entities/RemovedPokemon';

interface IRemovedPokemonsRepository {
  find(): Promise<RemovedPokemon[]>;
  findOne(id: number): Promise<RemovedPokemon | undefined>;
  create(id: number): Promise<RemovedPokemon>;
}

export default IRemovedPokemonsRepository;
