import React from 'react';

import Container from '../../Components/Molecules/Container';
import Header from '../../Components/Organisms/Header';
import PokemonTable from '../../Components/Organisms/PokemonTable';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Container as="main">
        <PokemonTable />
      </Container>
    </>
  );
};

export default Home;
