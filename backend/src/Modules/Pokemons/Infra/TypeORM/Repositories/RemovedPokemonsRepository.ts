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

  public findOne = async (
    name: string,
  ): Promise<RemovedPokemon | undefined> => {
    const pokemon = await this.ormRepository.findOne({
      where: { name },
    });
    return pokemon;
  };

  public create = async (name: string): Promise<RemovedPokemon> => {
    const pokemon = this.ormRepository.create({ name });
    await this.ormRepository.save(pokemon);
    return pokemon;
  };
}

export default RemovedPokemonsRepository;
