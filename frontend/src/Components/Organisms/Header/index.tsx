import React from 'react';
import {
  Flex,
  Heading,
  IconButton,
  Stack,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import { FiMoon, FiSun } from 'react-icons/fi';

import Container from '../../Molecules/Container';
import Logo from '../../Atoms/Logo';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const justifyContent = useBreakpointValue({
    base: 'center',
    md: 'flex-start',
  });

  return (
    <Container px="20" as="nav" shouldWrapChildren>
      <Flex justifyContent="space-between">
        <Stack
          direction="row"
          spacing="6"
          alignItems="center"
          justifyContent={justifyContent}
        >
          <Logo />
          <Heading size="sm">Pokédex</Heading>
        </Stack>

        {colorMode === 'light' ? (
          <IconButton
            onClick={toggleColorMode}
            icon={<FiMoon />}
            color="gray.600"
            aria-label="Set light"
          />
        ) : (
          <IconButton
            onClick={toggleColorMode}
            icon={<FiSun />}
            color="white"
            aria-label="Set dark"
          />
        )}
      </Flex>
    </Container>
  );
};

export default Header;
