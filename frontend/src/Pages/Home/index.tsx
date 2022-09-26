import React, { useMemo, useState } from 'react';

import Container from '../../Components/Molecules/Container';
import Table from '../../Components/Molecules/Table';
import {
  ITableColumn,
  ITableRow,
} from '../../Components/Molecules/TableContent';

const Home: React.FC = () => {
  const limit = 3;

  const [page, setPage] = useState(1);

  const rows = useMemo<ITableRow[]>(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        example1: i,
        example2: i + 1,
      })),
    [],
  );

  const columns = useMemo<ITableColumn[]>(
    () => [
      {
        title: 'example1',
        dataIndex: 'example1',
      },
      {
        title: 'example2',
        dataIndex: 'example2',
      },
    ],
    [],
  );

  return (
    <>
      <Container as="main">
        <Table
          rows={rows}
          columns={columns}
          limit={limit}
          page={page}
          setPage={setPage}
          total={rows.length}
        />
      </Container>
    </>
  );
};

export default Home;
