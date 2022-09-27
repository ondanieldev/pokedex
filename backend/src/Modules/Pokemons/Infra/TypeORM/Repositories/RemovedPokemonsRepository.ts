import IRemovedPokemonsRepository from '@Modules/Pokemons/Repositories/IRemovedPokemonsRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import RemovedPokemon from '../Entities/RemovedPokemon';

@EntityRepository(RemovedPokemon)
class RemovedPokemonsRepository implements IRemovedPokemonsRepository {
  private ormRepository: Repository<RemovedPokemon>;

  constructor() {
    this.ormRepository = getRepository(RemovedPokemon);
  }

  public find = async (): Promise<RemovedPokemon[]> => {
    const pokemons = await this.ormRepository.find();
    return pokemons;
  };

  public findOne = async (id: number): Promise<RemovedPokemon | undefined> => {
    const pokemon = await this.ormRepository.findOne({
      where: { id },
    });
    return pokemon;
  };

  public create = async (id: number): Promise<RemovedPokemon> => {
    const pokemon = this.ormRepository.create({ id });
    await this.ormRepository.save(pokemon);
    return pokemon;
  };
}

export default RemovedPokemonsRepository;
