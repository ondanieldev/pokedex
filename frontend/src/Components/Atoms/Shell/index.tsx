import React from 'react';
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

export const Shell: React.FC<BoxProps> = ({ children, ...rest }) => {
  const boxShadow = useColorModeValue('sm', 'sm-dark');
  return (
    <Box
      padding="6"
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={boxShadow}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Shell;
