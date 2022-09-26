import React, { useMemo } from 'react';
import {
  Box,
  BoxProps,
  Container as ChakraContainer,
  ContainerProps,
} from '@chakra-ui/react';

import Shell from '../../Atoms/Shell';

interface IContainerProps extends Omit<ContainerProps, 'as'> {
  as: 'header' | 'nav' | 'main' | 'section' | 'footer';
  shouldWrapChildren?: boolean;
  boxProps?: BoxProps;
}

export const Container: React.FC<IContainerProps> = ({
  as,
  boxProps,
  children,
  shouldWrapChildren,
  ...rest
}) => {
  const mb = useMemo(() => boxProps?.mb || '12', [boxProps]);

  return (
    <Box as={as} mb={mb}>
      {shouldWrapChildren ? (
        <Shell borderRadius="0">
          <ChakraContainer px="14" {...rest}>
            {children}
          </ChakraContainer>
        </Shell>
      ) : (
        <ChakraContainer {...rest}>
          <Shell>{children}</Shell>
        </ChakraContainer>
      )}
    </Box>
  );
};

export default Container;
