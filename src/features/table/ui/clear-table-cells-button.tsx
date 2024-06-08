"use client";
import { Button } from "@/shared/ui/ui-button";
import { useClearTableCells } from "../model/use-clear-table-cells";

export const ClearTableCellsButton = () => {
  const { clearCheckedCells } = useClearTableCells();
  return (
    <Button onClick={() => clearCheckedCells()}>
      Очистить выделенные ячейки
    </Button>
  );
};
