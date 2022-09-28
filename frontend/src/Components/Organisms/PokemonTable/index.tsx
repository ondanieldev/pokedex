import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Table, { ITableColumn, ITableRow } from '../../Molecules/Table';
import { usePokemons } from '../../../Hooks/usePokemons';
import { IPokemonListItem } from '../../../@Types/IPokemonList';
import PokemonDescription from '../PokemonDescription';
import RemoveButton from '../../Molecules/RemoveButton';
import IPokemon from '../../../@Types/IPokemon';

// Switch to true/false to see how the table comports using limit/offset provided from the API and how it comports using our own controllable variables
const paginateInternally = true;

interface IHandleIndex {
  lazy?: boolean;
}

const PokemonTable: React.FC = () => {
  const limit = 10;

  const { indexPokemons, indexRemovedPokemons } = usePokemons();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pokemons, setPokemons] = useState<IPokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  const handleIndexPokemons = useCallback(
    async ({ lazy }: IHandleIndex) => {
      if (!lazy) {
        setIsLoading(true);
      }
      const result = await indexPokemons({
        limit: paginateInternally ? 10000 : limit,
        offset: paginateInternally ? 0 : (page - 1) * limit,
      });

      if (result) {
        const removeds = await indexRemovedPokemons();
        if (removeds) {
          const removedNames = removeds.map(pokemon => pokemon.name);
          let pokemons = result.results.filter(
            pokemon => !removedNames.includes(pokemon.name),
          );
          if (filter) {
            pokemons = pokemons.filter(pokemon =>
              pokemon.name.toLowerCase().includes(filter.toLowerCase()),
            );
          }
          const total = filter
            ? pokemons.length
            : result.count - removedNames.length;
          setTotal(total);
          setPokemons(pokemons);
        }
      }

      if (!lazy) {
        setIsLoading(false);
      }
    },
    [indexPokemons, page, indexRemovedPokemons, filter],
  );

  const handleRenderAccordion = useCallback((row: ITableRow) => {
    if (!row || !row.name) return '';
    return <PokemonDescription name={row.name.toString()} />;
  }, []);

  const handleFilter = useCallback(
    (name: string) => {
      setPage(1);
      setFilter(name);
      handleIndexPokemons({});
    },
    [handleIndexPokemons],
  );

  const handleRefresh = useCallback(() => {
    setPage(1);
    handleIndexPokemons({});
  }, [handleIndexPokemons]);

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
              onDelete={() => handleIndexPokemons({ lazy: true })}
            />
          );
        },
      },
    ],
    [handleIndexPokemons],
  );

  useEffect(() => {
    handleIndexPokemons({});
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
      onRefresh={handleRefresh}
      onSearch={name => handleFilter(name)}
      renderAccordion={handleRenderAccordion}
      paginationStrategy={paginateInternally ? 'internal' : 'external'}
    />
  );
};

export default PokemonTable;
