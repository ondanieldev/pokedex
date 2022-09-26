import React from 'react';
import {
  Box,
  Button,
  Container,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

const Home: React.FC = () => {
  return (
    <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }}>
      <Box
        bg="bg-surface"
        boxShadow={{ base: 'none', md: useColorModeValue('sm', 'sm-dark') }}
        borderRadius={useBreakpointValue({ base: 'none', md: 'lg' })}
      >
        <Button type="submit" variant="primary">
          Test theme
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
