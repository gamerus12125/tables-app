"use client";
import { Button } from "@/shared/ui/ui-button";
import { Table } from "@prisma/client";
import { Minus } from "lucide-react";
import { useDeleteTableCells } from "../model/use-delete-table-cells";

export const DeleteTableCellsButton = ({
  table,
  type,
}: {
  table: Table;
  type: "row" | "col";
}) => {
  const { deleteCells } = useDeleteTableCells();
  return (
    <Button
      className="bg-red-600 hover:bg-red-700"
      onClick={() => {
        deleteCells(table, type);
      }}
    >
      <Minus />
    </Button>
  );
};
