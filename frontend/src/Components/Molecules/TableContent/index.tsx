import React, { useCallback, useMemo } from 'react';
import { Table, TableProps, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export type ITableRowValue = string | number;

export type ITableRow = Record<string, ITableRowValue>;

export interface ITableColumn {
  title: string;
  dataIndex?: string | string[];
  render?(row: unknown): React.ReactNode;
}

export interface ITableContentProps extends TableProps {
  rows: ITableRow[];
  columns: ITableColumn[];
  limit: number;
  page: number;
}

export const TableContent = ({
  columns,
  rows,
  limit,
  page,
  ...rest
}: ITableContentProps) => {
  const rowsView = useMemo<ITableRow[]>(() => {
    const offset = (page - 1) * limit;
    const rowsLength = rows.length - offset;
    const length = Math.min(limit, rowsLength);

    return Array.from({ length }, (_, i) => rows[offset + i]);
  }, [limit, rows, page]);

  const handleGetRowProp = useCallback(
    (row: ITableRow, column: ITableColumn): React.ReactNode => {
      if (column.render) {
        return column.render(row);
      }

      if (column.dataIndex) {
        if (typeof column.dataIndex === 'string') {
          return row[column.dataIndex];
        }

        if (Array.isArray(column.dataIndex)) {
          let prop: ITableRow | ITableRowValue = row;
          column.dataIndex.forEach(index => {
            if (typeof prop === 'object' && !!prop[index]) {
              prop = prop[index];
            }
          });
          if (typeof prop !== 'object') {
            return prop;
          }
        }
      }

      return '';
    },
    [],
  );

  return (
    <Table {...rest}>
      <Thead>
        <Tr>
          {columns.map((column, index) => (
            <Th key={index} textTransform="capitalize">
              {column.title}
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {rowsView.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {columns.map((column, rowIndex) => (
              <Td key={rowIndex}>{handleGetRowProp(row, column)}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableContent;
