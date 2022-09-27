import React, { useCallback, useState } from 'react';
import { Button, ButtonProps, Icon, useColorModeValue } from '@chakra-ui/react';
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

  const color = useColorModeValue('red.500', 'red.300');
  const colorAction = useColorModeValue('red.50', 'gray.700');
  const colorBorder = 'red.200';

  return (
    <Button
      size="sm"
      variant="outline"
      color={color}
      borderColor={colorBorder}
      _hover={{ bg: colorAction }}
      _active={{ bg: colorAction }}
      leftIcon={<Icon as={FiTrash2} color={color} marginStart="-1" />}
      onClick={() => handleRemovePokemon(name)}
      isLoading={isLoading}
      {...props}
    >
      Remove
    </Button>
  );
};

export default RemoveButton;
