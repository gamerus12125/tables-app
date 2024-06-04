"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/ui-table";
import { ChangeableTableCell, useTable, useTableCells } from "@/features/table";
import { AddTableCellsButton } from "@/features/add-table-cells-button";
import { DeleteTableCellsButton } from "@/features/delete-table-cells-button";

export const TableWidget = ({ id }: { id: number }) => {
  const { table, isPending } = useTable(id);
  const { cells } = useTableCells(id);

  const getTableHeader = () => {
    if (!table) return [];
    let result = [];
    const { cols } = table;
    for (let i = 0; i < cols; i++) {
      const cell = getTableCell(i, 0);
      result.push(
          <ChangeableTableCell key={JSON.stringify([i, 0])} cell={cell || { tableId: id, col: i, row: 0, value: "", id: -1 }} />
      );
    }
    return result;
  };

  const getRowCells = (row: number) => {
    if (!table || !cells) return [];
    let result = [];
    const { cols } = table;
    for (let i = 0; i < cols; i++) {
      const cell = getTableCell(i, row);
      result.push(
        <ChangeableTableCell
          cell={cell || { tableId: id, col: i, row, value: "", id: -1 }}
          key={JSON.stringify([i, row])}
        />
      );
    }
    return result;
  };

  const getTableCell = (col: number, row: number) => {
    const result = cells.find((cell) => cell.col === col && cell.row === row);
    return result;
  };

  const getTableBody = () => {
    if (!table) return [];
    let result = [];
    const { rows } = table;
    for (let i = 1; i < rows; i++) {
      result.push(<TableRow key={i}>{getRowCells(i)}</TableRow>);
    }
    return result;
  };

  return (
    <Table>
      <TableCaption>Таблица No{id}</TableCaption>
      {table && !isPending ? (
        <>
          <TableHeader>
            <TableRow>
              {getTableHeader()}
              <TableHead>
                <div className="flex items-center gap-5">
                <AddTableCellsButton table={table} type={"col"}/>
                <DeleteTableCellsButton table={table} type={"col"}/>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getTableBody()}
            <TableRow>
              <TableCell>
              <div className="flex items-center gap-5">
                <AddTableCellsButton table={table} type={"row"}/>
                <DeleteTableCellsButton table={table} type={"row"}/>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </>
      ) : (
        ""
      )}
    </Table>
  );
};
