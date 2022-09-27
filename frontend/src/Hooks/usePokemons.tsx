import React, { createContext, useCallback, useContext, useMemo } from 'react';

import IListPokemonsDTO from '../@Types/IListPokemonsDTO';
import IPokemon from '../@Types/IPokemon';
import IPokemonList from '../@Types/IPokemonList';
import IRemovedPokemon from '../@Types/IRemovedPokemon';
import customAPI from '../Services/customAPI';
import pokeAPI from '../Services/pokeAPI';
import useErrors from './useErrors';

interface IProps {
  children: React.ReactNode;
}

interface IPokemonsContext {
  indexPokemons: (data: IListPokemonsDTO) => Promise<IPokemonList | null>;
  showPokemon: (name: string) => Promise<IPokemon | null>;
  removePokemon: (id: number) => Promise<IRemovedPokemon | null>;
}

const PokemonsContext = createContext<IPokemonsContext>({} as IPokemonsContext);

export const PokemonsProvider: React.FC<IProps> = ({ children }) => {
  const { handleErrors } = useErrors();

  const indexPokemons = useCallback(
    async (data: IListPokemonsDTO): Promise<IPokemonList | null> => {
      try {
        const response = await pokeAPI.get('/pokemon', {
          params: data,
        });
        return response.data;
      } catch (err) {
        handleErrors('Error when trying to index pokémons', err);
        return null;
      }
    },
    [handleErrors],
  );

  const showPokemon = useCallback(
    async (name: string): Promise<IPokemon | null> => {
      try {
        const response = await pokeAPI.get(`/pokemon/${name}`);
        return response.data;
      } catch (err) {
        handleErrors('Error when trying to get pokémon data', err);
        return null;
      }
    },
    [handleErrors],
  );

  const removePokemon = useCallback(
    async (id: number): Promise<IRemovedPokemon | null> => {
      try {
        const response = await customAPI.delete(`/pokemons/${id}`);
        return response.data;
      } catch (err) {
        handleErrors('Error when trying to remove pokémon', err);
        return null;
      }
    },
    [handleErrors],
  );

  const value = useMemo<IPokemonsContext>(
    () => ({
      indexPokemons,
      showPokemon,
      removePokemon,
    }),
    [indexPokemons, showPokemon, removePokemon],
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

export default usePokemons;
