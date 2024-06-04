import {
  useAddTableCellsByAmountMutation,
  useUpdateTableMutation,
} from "@/entities/tables";
import { Table } from "@prisma/client";

export const useAddCells = () => {
  const updateTableMutation = useUpdateTableMutation();
  const addTableCellsByAmountMutation = useAddTableCellsByAmountMutation();
  const addCells = (type: "row" | "col", table: Table) => {
    let { cols, rows } = table;

    type === "row" ? rows++ : cols++;

    updateTableMutation.mutate({
      tableId: table.id,
      cols,
      rows,
      name: table.name,
    });

    if (type === "row") {
      addTableCellsByAmountMutation.mutate({
        tableId: table.id,
        amount: cols,
        row: rows - 1,
      });
    } else {
      addTableCellsByAmountMutation.mutate({
        tableId: table.id,
        amount: rows,
        col: cols - 1,
      });
    }
  };
  const isPending =
    updateTableMutation.isPending || addTableCellsByAmountMutation.isPending;
  return { isPending, addCells };
};
