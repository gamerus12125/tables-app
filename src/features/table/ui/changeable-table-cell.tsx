"use client";
import {
  useChangedCellsStore,
  useCheckedCellsStore,
} from "@/shared/store/zustand.store";
import { TableCell } from "@/shared/ui/ui-table";
import { Textarea } from "@/shared/ui/ui-textarea";
import { Cell } from "@prisma/client";
import React, { useState } from "react";

export const ChangeableTableCell = ({ cell }: { cell: Cell }) => {
  const [isChangeable, toggleIsChangeable] = useState(false);
  const { addChangedCell, changedCells } = useChangedCellsStore();
  const { addCheckedCell, checkedCells } = useCheckedCellsStore();
  const value = changedCells.find((c) => c.id === cell.id)?.value || cell.value;
  const isChecked = checkedCells.find((c) => c.id === cell.id);

  return (
    <TableCell
      onDoubleClick={() => toggleIsChangeable(!isChangeable)}
      onClick={() => addCheckedCell(cell)}
      style={{ border: `2px solid ${cell.borderColor || "hsl(215.3,25%,26.7%)"}` }}
      className={`${isChecked ? "bg-rose-800" : ""}`}
    >
      {isChangeable ? (
        <Textarea
          value={value}
          onChange={(e) => addChangedCell({ ...cell, value: e.target.value })}
          className="h-fit min-w-[100px"
        />
      ) : (
        value.split("\n").map((row, index) => (
          <p key={index} className="min-w-[100px]">
            {row}
          </p>
        ))
      )}
    </TableCell>
  );
};
