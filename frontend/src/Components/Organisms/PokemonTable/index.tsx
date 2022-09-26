import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Table, { ITableColumn, ITableRow } from '../../Molecules/Table';
import { usePokemons } from '../../../Hooks/usePokemons';
import { IPokemonListItem } from '../../../@Types/IPokemonList';

const PokemonTable: React.FC = () => {
  const limit = 10;

  const { indexPokemons } = usePokemons();

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pokemons, setPokemons] = useState<IPokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    ],
    [],
  );

  const handleIndexPokemons = useCallback(async () => {
    setIsLoading(true);
    const result = await indexPokemons({
      limit,
      offset: (page - 1) * limit,
    });
    setIsLoading(false);
    if (!result) return;

    setTotal(result.count);
    setPokemons(result.results);
  }, [indexPokemons, page]);

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
      renderAccordion={() => <div>Test</div>}
    />
  );
};

export default PokemonTable;
