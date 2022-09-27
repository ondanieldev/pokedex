import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import theme from './Styles/theme';
import CombineProviders from './Hooks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CombineProviders>
        <App />
      </CombineProviders>
    </ChakraProvider>
  </React.StrictMode>,
);
