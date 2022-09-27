import React, { useCallback, useState } from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

import useToast from '../../../Hooks/useToast';
import usePokemons from '../../../Hooks/usePokemons';

interface IProps extends Omit<ButtonProps, 'children'> {
  name: string;
  onDelete?: () => unknown;
}

const RemoveButton: React.FC<IProps> = ({ name, onDelete, ...props }) => {
  const { showToast } = useToast();
  const { removePokemon } = usePokemons();

  const [isLoading, setIsLoading] = useState(false);

  const handleRemovePokemon = useCallback(
    async (name: string) => {
      setIsLoading(true);

      const removedPokemon = await removePokemon(name);
      if (removedPokemon) {
        showToast({
          title: 'Pokémon removed successfully',
          status: 'success',
        });
        if (onDelete) {
          onDelete();
        }
      }

      setIsLoading(false);
    },
    [removePokemon, showToast, onDelete],
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
