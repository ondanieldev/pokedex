import React, { useCallback, useState } from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

import useToast from '../../../Hooks/useToast';
import usePokemons from '../../../Hooks/usePokemons';

interface IProps extends Omit<ButtonProps, 'children'> {
  name: string;
}

const RemoveButton: React.FC<IProps> = ({ name, ...props }) => {
  const { showToast } = useToast();
  const { removePokemon, showPokemon } = usePokemons();

  const [isLoading, setIsLoading] = useState(false);

  const handleRemovePokemon = useCallback(
    async (name: string) => {
      setIsLoading(true);

      const pokemon = await showPokemon(name);
      if (pokemon) {
        const removedPokemon = await removePokemon(pokemon.name);
        if (removedPokemon) {
          showToast({
            title: 'Pokémon removed successfully',
            status: 'success',
          });
        }
      }

      setIsLoading(false);
    },
    [showPokemon, removePokemon, showToast],
  );

  return (
    <Button
      size="sm"
      variant="outline"
      color="red.500"
      borderColor="red.200"
      _hover={{ bg: 'red.50' }}
      _active={{ bg: 'red.100' }}
      leftIcon={<Icon as={FiTrash2} color="red.500" marginStart="-1" />}
      onClick={() => handleRemovePokemon(name)}
      isLoading={isLoading}
      {...props}
    >
      Remove
    </Button>
  );
};

export default RemoveButton;
