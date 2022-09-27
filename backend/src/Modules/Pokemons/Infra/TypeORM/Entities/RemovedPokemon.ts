import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('removed_pokemons')
class RemovedPokemon {
  @PrimaryColumn()
  id: number;

  @CreateDateColumn()
  removedAt: Date;
}

export default RemovedPokemon;
