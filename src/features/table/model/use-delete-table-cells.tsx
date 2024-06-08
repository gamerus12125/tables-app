import {
  useDeleteTableCellsMutation,
  useUpdateTableMutation,
} from "@/entities/tables";
import { Table } from "@prisma/client";

export const useDeleteTableCells = () => {
  const deleteTableCellsMutation = useDeleteTableCellsMutation();
  const updateTableMutation = useUpdateTableMutation();
  const deleteCells = (table: Table, type: "row" | "col") => {
    let { cols, rows } = table;

    type === "row" ? rows-- : cols--;

    updateTableMutation.mutate({
      tableId: table.id,
      cols,
      rows,
    });

    if (type === "row") {
      deleteTableCellsMutation.mutate({
        tableId: table.id,
        row: table.rows - 1,
      });
    } else {
      deleteTableCellsMutation.mutate({
        tableId: table.id,
        col: table.cols - 1,
      });
    }
  };

  return { deleteCells, isPending: deleteTableCellsMutation.isPending };
};
