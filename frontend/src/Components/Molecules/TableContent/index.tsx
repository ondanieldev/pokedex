import React, { useMemo } from 'react';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import TableRow from '../TableRow';
import { ITableProps, ITableRow } from '../Table';

type ITableContentProps = Pick<
  ITableProps,
  | 'columns'
  | 'rows'
  | 'limit'
  | 'page'
  | 'renderAccordion'
  | 'paginationStrategy'
>;

export const TableContent: React.FC<ITableContentProps> = ({
  columns,
  rows,
  limit,
  page,
  renderAccordion,
  paginationStrategy = 'external',
}) => {
  const rowsView = useMemo<ITableRow[]>(() => {
    if (paginationStrategy === 'internal') {
      const offset = (page - 1) * limit;
      const rowsLength = rows.length - offset;
      const length = Math.min(limit, rowsLength);
      return Array.from({ length }, (_, i) => rows[offset + i]);
    }

    const rowsLength = rows.length;
    const length = Math.min(limit, rowsLength);
    return Array.from({ length }, (_, i) => rows[i]);
  }, [limit, rows, page, paginationStrategy]);

  return (
    <Table>
      <Thead>
        <Tr>
          {renderAccordion && <Th width="0" />}

          {columns.map((column, index) => (
            <Th key={index} textTransform="capitalize">
              {column.title}
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {rowsView.map((row, rowIndex) => (
          <TableRow
            row={row}
            key={rowIndex}
            columns={columns}
            renderAccordion={renderAccordion}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default TableContent;
