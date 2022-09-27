import React from 'react';
import { Link, Text } from '@chakra-ui/react';

import Container from '../../Molecules/Container';

const Footer: React.FC = () => {
  return (
    <Container as="footer" boxProps={{ mb: '0' }} shouldWrapChildren>
      <Text textAlign="center">
        Made with{' '}
        <Link color="blue.500" href="https://chakra-ui.com" isExternal>
          ChakraUI
        </Link>{' '}
        and{' '}
        <Link color="blue.500" href="https://pokeapi.co/" isExternal>
          PokéAPI
        </Link>
      </Text>
    </Container>
  );
};

export default Footer;
