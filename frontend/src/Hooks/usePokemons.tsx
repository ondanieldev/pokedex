import React, { createContext, useCallback, useContext, useMemo } from 'react';

import IListPokemonsDTO from '../@Types/IListPokemonsDTO';
import IPokemon from '../@Types/IPokemon';
import IPokemonList from '../@Types/IPokemonList';
import pokeAPI from '../Services/pokeAPI';

interface IProps {
  children: React.ReactNode;
}

interface IPokemonsContext {
  indexPokemons: (data: IListPokemonsDTO) => Promise<IPokemonList | null>;
  showPokemon: (name: string) => Promise<IPokemon | null>;
}

const PokemonsContext = createContext<IPokemonsContext>({} as IPokemonsContext);

export const PokemonsProvider: React.FC<IProps> = ({ children }) => {
  const indexPokemons = useCallback(
    async (data: IListPokemonsDTO): Promise<IPokemonList | null> => {
      try {
        const response = await pokeAPI.get('/pokemon', {
          params: data,
        });
        return response.data;
      } catch {
        return null;
      }
    },
    [],
  );

  const showPokemon = useCallback(
    async (name: string): Promise<IPokemon | null> => {
      try {
        const response = await pokeAPI.get(`/pokemon/${name}`);
        return response.data;
      } catch {
        return null;
      }
    },
    [],
  );

  const value = useMemo<IPokemonsContext>(
    () => ({
      indexPokemons,
      showPokemon,
    }),
    [indexPokemons, showPokemon],
  );

  return (
    <PokemonsContext.Provider value={value}>
      {children}
    </PokemonsContext.Provider>
  );
};

export const usePokemons = (): IPokemonsContext => {
  const context = useContext(PokemonsContext);

  if (!context) {
    throw Error(
      'Component that uses usePokemons must be wrapped by PokemonsProvider',
    );
  }

  return context;
};
