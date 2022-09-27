import React, { useCallback, useMemo, useState } from 'react';
import { IconButton, Td, Tr } from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

import { ITableColumn, ITableProps, ITableRow, ITableRowValue } from '../Table';

interface ITableRowProps
  extends Pick<ITableProps, 'columns' | 'renderAccordion'> {
  row: ITableRow;
}

export const TableRow: React.FC<ITableRowProps> = ({
  row,
  columns,
  renderAccordion,
}) => {
  const [showAccordion, setShowAccordion] = useState(false);

  const accordionIcon = useMemo(
    () => (showAccordion ? <FaChevronUp /> : <FaChevronDown />),
    [showAccordion],
  );

  const handleToggleAccordion = useCallback(() => {
    setShowAccordion(!showAccordion);
  }, [showAccordion]);

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
    <>
      <Tr>
        {renderAccordion && (
          <Td>
            <IconButton
              aria-label="Toggle item"
              size="sm"
              icon={accordionIcon}
              variant="ghost"
              rounded="md"
              onClick={handleToggleAccordion}
            />
          </Td>
        )}

        {columns.map((column, rowIndex) => (
          <Td textTransform="capitalize" key={rowIndex}>
            {handleGetRowProp(row, column)}
          </Td>
        ))}
      </Tr>

      {renderAccordion && showAccordion && (
        <Tr>
          <Td colSpan={columns.length + 1}>{renderAccordion(row)}</Td>
        </Tr>
      )}
    </>
  );
};

export default TableRow;
