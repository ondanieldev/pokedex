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
import TableContent from '../TableContent';
import TableHeader from '../TableHeader';

export type ITableRowValue = string | number;

export type ITableRow = Record<string, ITableRowValue>;
export interface ITableColumn {
  title: string;
  dataIndex?: string | string[];
  render?(row: unknown): React.ReactNode;
  width?: string;
}
export interface ITableProps {
  title: string;

  rows: ITableRow[];
  columns: ITableColumn[];
  renderAccordion?: (row: ITableRow) => React.ReactNode;

  limit: number;
  total: number;
  page: number;
  setPage: ISetState<number>;
  paginationStrategy?: 'internal' | 'external';

  isLoading?: boolean;

  onRefresh?: () => unknown;
}

export const Table: React.FC<ITableProps> = ({
  page,
  limit,
  total,
  columns,
  rows,
  setPage,
  isLoading,
  title,
  onRefresh,
  renderAccordion,
  paginationStrategy,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const isValid = useMemo(
    () => page > 0 && limit > 0 && rows.length > 0,
    [page, limit, rows],
  );

  const paginationText = useMemo(() => {
    if (!isValid) return '';

    const start = (page - 1) * rows.length + 1;
    const end = Math.min(page * rows.length, total);
    return `Showing ${start} to ${end} of ${total} results`;
  }, [page, rows, total, isValid]);

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
      <TableHeader title={title} onRefresh={onRefresh} />

      <Box overflowX="auto">
        {isValid && (
          <Skeleton isLoaded={!isLoading}>
            <TableContent
              limit={limit}
              page={page}
              rows={rows}
              columns={columns}
              renderAccordion={renderAccordion}
              paginationStrategy={paginationStrategy}
            />
          </Skeleton>
        )}
      </Box>

      <Box px={{ base: '4', md: '6' }} pb="5">
        <HStack spacing="3" justify="space-between">
          {!isMobile && (
            <Skeleton isLoaded={!isLoading}>
              <Text color="muted" fontSize="sm">
                {paginationText}
              </Text>
            </Skeleton>
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
