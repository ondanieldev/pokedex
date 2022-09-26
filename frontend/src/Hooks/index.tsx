import React from 'react';

import { PokemonsProvider } from './usePokemons';

interface IProps {
  children: React.ReactNode;
}

type IProviders = React.FC<IProps>[];

const providers: IProviders = [PokemonsProvider];

const CombineProviders: React.FC<IProps> = ({ children }) => {
  return (
    <>
      {providers.reduceRight((acc, Provider, i) => {
        return <Provider key={i}>{acc}</Provider>;
      }, children)}
    </>
  );
};

export default CombineProviders;
