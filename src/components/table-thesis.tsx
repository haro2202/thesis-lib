import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@heroui/react";
import { Thesis } from "@/pages";

interface TableThesisProps {
  thesisList: Thesis[];
}

export default function TableThesis({ thesisList }: TableThesisProps) {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 10;
  const items = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return thesisList.slice(start, end);
  }, [page, thesisList]);

  const pages = useMemo(() => {
    return thesisList?.length ? Math.ceil(thesisList.length / rowsPerPage) : 0;
  }, [thesisList]);

  return (
    <Table
      selectedKeys={["key", "title", "year"]}
      aria-label="Example table with client side pagination"
      bottomContent={
        pages > 0 && (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        )
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="key">STT</TableColumn>
        <TableColumn key="title">Title</TableColumn>
        <TableColumn key="year">Year</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                <p className="my-2">{getKeyValue(item, columnKey)}</p>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
