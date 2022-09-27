import React from 'react';

import Container from '../../Components/Molecules/Container';
import Footer from '../../Components/Organisms/Footer';
import Header from '../../Components/Organisms/Header';
import PokemonTable from '../../Components/Organisms/PokemonTable';

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <Container as="main">
        <PokemonTable />
      </Container>

      <Footer />
    </>
  );
};

export default Home;
