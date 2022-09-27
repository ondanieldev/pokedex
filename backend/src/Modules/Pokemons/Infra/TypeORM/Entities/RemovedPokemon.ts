import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('removed_pokemons')
class RemovedPokemon {
  @PrimaryColumn()
  name: string;

  @CreateDateColumn()
  removedAt: Date;
}

export default RemovedPokemon;
