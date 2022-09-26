import React, { useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import ISetState from '../../../@Types/ISetState';
import TableContent, { ITableContentProps } from '../TableContent';

interface ITableProps extends ITableContentProps {
  page: number;
  limit: number;
  total: number;
  setPage: ISetState<number>;
  isLoading?: boolean;
}

export const Table: React.FC<ITableProps> = ({
  page,
  limit,
  total,
  columns,
  rows,
  setPage,
  isLoading,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const isValid = useMemo(
    () => page > 0 && limit > 0 && rows.length > 0,
    [page, limit, rows],
  );

  const paginationText = useMemo(() => {
    if (!isValid) return '';

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);
    return `Showing ${start} to ${end} of ${total} results`;
  }, [page, limit, total, isValid]);

  const isTherePrevious = useMemo<boolean>(
    () => isValid && page > 1,
    [page, isValid],
  );

  const isThereNext = useMemo<boolean>(
    () => isValid && page < Math.ceil(total / limit),
    [page, total, limit, isValid],
  );

  const handlePrevious = useCallback(() => {
    if (!isTherePrevious) return;
    setPage(page - 1);
  }, [isTherePrevious, setPage, page]);

  const handleNext = useCallback(() => {
    if (!isThereNext) return;
    setPage(page + 1);
  }, [isThereNext, setPage, page]);

  return (
    <Stack spacing="5">
      <Box overflowX="auto">
        {isValid && (
          <Skeleton isLoaded={!isLoading}>
            <TableContent
              columns={columns}
              rows={rows}
              limit={limit}
              page={page}
            />
          </Skeleton>
        )}
      </Box>

      <Box px={{ base: '4', md: '6' }} pb="5">
        <HStack spacing="3" justify="space-between">
          {!isMobile && (
            <Text color="muted" fontSize="sm">
              {paginationText}
            </Text>
          )}

          <ButtonGroup
            spacing="3"
            justifyContent="space-between"
            width={{ base: 'full', md: 'auto' }}
            variant="secondary"
          >
            {isTherePrevious && (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePrevious}
                disabled={isLoading}
              >
                Previous
              </Button>
            )}
            {isThereNext && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleNext}
                disabled={isLoading}
              >
                Next
              </Button>
            )}
          </ButtonGroup>
        </HStack>
      </Box>
    </Stack>
  );
};

export default Table;
