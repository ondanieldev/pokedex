import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Table, { ITableColumn, ITableRow } from '../../Molecules/Table';
import { usePokemons } from '../../../Hooks/usePokemons';
import { IPokemonListItem } from '../../../@Types/IPokemonList';
import PokemonDescription from '../PokemonDescription';

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
      // <Button
      //           size="sm"
      //           variant="outline"
      //           color="red.500"
      //           borderColor="red.200"
      //           _hover={{ bg: 'red.50' }}
      //           _active={{ bg: 'red.100' }}
      //           leftIcon={
      //             <Icon as={FiTrash2} color="red.500" marginStart="-1" />
      //           }
      //         >
      //           Remove
      //         </Button>
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

  const handleRenderAccordion = useCallback((row: ITableRow) => {
    if (!row || !row.name) return '';
    return <PokemonDescription name={row.name.toString()} />;
  }, []);

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
