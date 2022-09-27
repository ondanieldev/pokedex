import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Table, { ITableColumn, ITableRow } from '../../Molecules/Table';
import { usePokemons } from '../../../Hooks/usePokemons';
import { IPokemonListItem } from '../../../@Types/IPokemonList';
import PokemonDescription from '../PokemonDescription';
import RemoveButton from '../../Atoms/RemoveButton';
import IPokemon from '../../../@Types/IPokemon';

const PokemonTable: React.FC = () => {
  const limit = 10;

  const { indexPokemons, indexRemovedPokemons } = usePokemons();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pokemons, setPokemons] = useState<IPokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleIndexPokemons = useCallback(
    async (lazy = false) => {
      if (!lazy) {
        setIsLoading(true);
      }
      const result = await indexPokemons({
        limit,
        offset: (page - 1) * limit,
      });

      if (result) {
        const removeds = await indexRemovedPokemons();
        if (removeds) {
          const removedNames = removeds.map(pokemon => pokemon.name);
          const pokemons = result.results.filter(
            pokemon => !removedNames.includes(pokemon.name),
          );
          setTotal(result.count);
          setPokemons(pokemons);
        }
      }

      if (!lazy) {
        setIsLoading(false);
      }
    },
    [indexPokemons, page, indexRemovedPokemons],
  );

  const handleRenderAccordion = useCallback((row: ITableRow) => {
    if (!row || !row.name) return '';
    return <PokemonDescription name={row.name.toString()} />;
  }, []);

  const rows = useMemo<ITableRow[]>(
    () =>
      pokemons.map(pokemon => ({
        name: pokemon.name,
      })),
    [pokemons],
  );

  const columns = useMemo<ITableColumn[]>(
    () => [
      {
        title: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Actions',
        width: '0',
        render: (row: IPokemon) => {
          return (
            <RemoveButton
              name={row.name}
              onDelete={() => handleIndexPokemons(true)}
            />
          );
        },
      },
    ],
    [handleIndexPokemons],
  );

  useEffect(() => {
    handleIndexPokemons();
  }, [handleIndexPokemons]);

  return (
    <Table
      title="Pokémons"
      rows={rows}
      columns={columns}
      limit={limit}
      page={page}
      setPage={setPage}
      total={total}
      isLoading={isLoading}
      onRefresh={handleIndexPokemons}
      renderAccordion={handleRenderAccordion}
    />
  );
};

export default PokemonTable;
