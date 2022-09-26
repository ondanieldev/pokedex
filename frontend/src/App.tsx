import React from 'react';
import logo from './logo.png';

const App: React.FC = () => {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
        <p>Pokédex.</p>
      </header>
    </div>
  );
};

export default App;
