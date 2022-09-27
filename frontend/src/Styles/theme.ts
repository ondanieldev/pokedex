import { extendTheme } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
  },
  proTheme,
);

export default theme;
