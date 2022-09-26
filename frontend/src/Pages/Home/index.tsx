import React from 'react';

import Container from '../../Components/Molecules/Container';
import PokemonTable from '../../Components/Organisms/PokemonTable';

const Home: React.FC = () => {
  return (
    <Container as="main">
      <PokemonTable />
    </Container>
  );
};

export default Home;
