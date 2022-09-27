import React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

type IProps = Omit<ButtonProps, 'children'>;

const RemoveButton: React.FC<IProps> = props => {
  return (
    <Button
      size="sm"
      variant="outline"
      color="red.500"
      borderColor="red.200"
      _hover={{ bg: 'red.50' }}
      _active={{ bg: 'red.100' }}
      leftIcon={<Icon as={FiTrash2} color="red.500" marginStart="-1" />}
      {...props}
    >
      Remove
    </Button>
  );
};

export default RemoveButton;
