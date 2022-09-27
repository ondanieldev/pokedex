import React, { useCallback, useState } from 'react';
import { FiRefreshCw, FiSearch } from 'react-icons/fi';
import {
  Box,
  ButtonGroup,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react';

import { ITableProps } from '../Table';

type ITableHeaderProps = Pick<ITableProps, 'title' | 'onRefresh' | 'onSearch'>;

const TableHeader: React.FC<ITableHeaderProps> = ({
  title,
  onRefresh,
  onSearch,
}) => {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  const handleOnSearch = useCallback(
    (value: string) => {
      if (!onSearch) return;

      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      const timeout = setTimeout(() => {
        onSearch(value);
      }, 500);

      setSearchTimeout(timeout);
    },
    [onSearch, searchTimeout],
  );

  return (
    <Box px={{ base: '4', md: '6' }} pt="5">
      <Stack direction={{ base: 'column', md: 'row' }} justify="space-between">
        <Text fontSize="lg" fontWeight="medium">
          {title}
        </Text>

        <Stack spacing="6" direction="row">
          <InputGroup maxW="xs">
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="muted" boxSize="5" />
            </InputLeftElement>
            <Input
              placeholder="Search"
              onChange={e => handleOnSearch(e.target.value)}
            />
          </InputGroup>

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
      </Stack>
    </Box>
  );
};

export default TableHeader;
