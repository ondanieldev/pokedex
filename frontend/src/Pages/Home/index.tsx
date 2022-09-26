import React from 'react';
import { Button } from '@chakra-ui/react';

import Container from '../../Components/Molecules/Container';

const Home: React.FC = () => {
  return (
    <>
      <Container as="header" shouldWrapChildren>
        <Button variant="primary">Header</Button>
      </Container>

      <Container as="main">
        <Button variant="primary">Main</Button>
      </Container>
    </>
  );
};

export default Home;
