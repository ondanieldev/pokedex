import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { Box, ButtonGroup, IconButton, Stack, Text } from '@chakra-ui/react';

export interface ITableHeaderProps {
  title: string;
  onRefresh?: () => unknown;
}

const TableHeader: React.FC<ITableHeaderProps> = ({ title, onRefresh }) => {
  return (
    <Box px={{ base: '4', md: '6' }} pt="5">
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Text fontSize="lg" fontWeight="medium">
          {title}
        </Text>

        <ButtonGroup>
          {onRefresh && (
            <IconButton
              aria-label="refresh"
              icon={<FiRefreshCw />}
              onClick={onRefresh}
            />
          )}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default TableHeader;
