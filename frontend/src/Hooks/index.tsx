import React from 'react';
import { ToastProvider as ChakraToastProvider } from '@chakra-ui/react';

import { ToastProvider } from './useToast';
import { ErrorsProvider } from './useErrors';
import { PokemonsProvider } from './usePokemons';

interface IProps {
  children: React.ReactNode;
}

type IProviders = React.FC<IProps>[];

const providers: IProviders = [
  ChakraToastProvider,
  ToastProvider,
  ErrorsProvider,
  PokemonsProvider,
];

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
