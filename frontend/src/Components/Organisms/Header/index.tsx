import React from 'react';
import { Heading, Stack, useBreakpointValue } from '@chakra-ui/react';

import Container from '../../Molecules/Container';
import Logo from '../../Atoms/Logo';

const Header: React.FC = () => {
  const justifyContent = useBreakpointValue({
    base: 'center',
    md: 'flex-start',
  });

  return (
    <Container as="nav" shouldWrapChildren>
      <Stack
        direction="row"
        spacing="6"
        alignItems="center"
        justifyContent={justifyContent}
      >
        <Logo />
        <Heading size="sm">Pokédex</Heading>
      </Stack>
    </Container>
  );
};

export default Header;
