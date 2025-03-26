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
  Spinner,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Thesis } from "@/types/types";
import EditThesisModel from "./edit-thesis-model";
import DeleteThesisModel from "./delete-thesis-model";

interface TableThesisProps {
  thesisList: Thesis[];
  isLoading: boolean;
  onSave: (thesis: Thesis) => void;
  onDelete: (thesis: Thesis) => void;
  searchText: string;
  searchFunction: (rootText: string, textSearch: string) => number;
}

export default function TableThesis({
  thesisList,
  isLoading,
  onSave,
  onDelete,
  searchText,
  searchFunction,
}: TableThesisProps) {
  const [page, setPage] = useState<number>(thesisList.length ? 1 : 0);

  const rowsPerPage = 10;

  const [selectedThesis, setSelectedThesis] = useState<Thesis>();

  const items = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return thesisList.slice(start, end);
  }, [page, thesisList]);

  const pages = useMemo(() => {
    return thesisList?.length ? Math.ceil(thesisList.length / rowsPerPage) : 0;
  }, [thesisList]);

  useEffect(() => {
    setPage(1);
  }, [thesisList]);

  const {
    isOpen: isOpenEditModel,
    onOpen: onOpenEditModel,
    onOpenChange,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModel,
    onOpen: onOpenDeleteModel,
    onOpenChange: onOpenChangeDeleteModel,
  } = useDisclosure();

  return (
    <>
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
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          )
        }
        layout="fixed"
        classNames={{
          wrapper: "min-h-[300px] p-4 ring-[2px] ring-primary-100",
          th: "bg-primary-100 text-black font-bold",
        }}
      >
        <TableHeader>
          <TableColumn
            allowsSorting
            align="start"
            key="title"
            className="w-full"
          >
            Title
          </TableColumn>
          <TableColumn align="center" key="year" className="w-24">
            Year
          </TableColumn>
          <TableColumn align="center" key="action" className="w-44">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={<Spinner />}
        >
          {(item) => {
            return (
              <TableRow>
                {(columnKey) => {
                  switch (columnKey) {
                    case "action":
                      return (
                        <TableCell className="flex justify-center gap-2">
                          <Button
                            radius="sm"
                            variant="shadow"
                            className="bg-primary-100"
                            onPress={() => {
                              setSelectedThesis(item);
                              onOpenEditModel();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            radius="sm"
                            variant="shadow"
                            className="bg-red-500 text-white"
                            onPress={() => {
                              setSelectedThesis(item);
                              onOpenDeleteModel();
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      );
                    case "title":
                      const title = getKeyValue(item, columnKey);
                      const index = searchFunction(title, searchText);

                      return (
                        <TableCell>
                          {index !== -1 ? (
                            <>
                              {title.slice(0, index)}
                              <span className="text-primary">
                                {title.slice(index, index + searchText.length)}
                              </span>
                              {title.slice(index + searchText.length)}
                            </>
                          ) : (
                            title
                          )}
                        </TableCell>
                      );
                    default:
                      return (
                        <TableCell>
                          <p className="my-2 line-clamp-1">
                            {getKeyValue(item, columnKey)}
                          </p>
                        </TableCell>
                      );
                  }
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
      {selectedThesis && (
        <>
          <EditThesisModel
            isOpenEditModel={isOpenEditModel}
            onOpenChangeEditModel={onOpenChange}
            thesis={selectedThesis}
            onSave={onSave}
          />
          <DeleteThesisModel
            isOpenDeleteModel={isOpenDeleteModel}
            onOpenChangeDeleteModel={onOpenChangeDeleteModel}
            thesis={selectedThesis}
            onDelete={onDelete}
          />
        </>
      )}
    </>
  );
}
