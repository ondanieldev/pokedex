import React from 'react';
import { Flex, Heading, Stack } from '@chakra-ui/react';

import Container from '../../Molecules/Container';
import Logo from '../../Atoms/Logo';

const Header: React.FC = () => {
  return (
    <Container as="nav" shouldWrapChildren>
      <Stack direction="row" spacing="6" alignItems="center">
        <Logo />
        <Heading size="sm">Pokédex</Heading>
      </Stack>
    </Container>
  );
};

export default Header;
