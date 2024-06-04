"use client";
import {
  useChangedCellsStore,
  useCheckedCellsStore,
} from "@/shared/store/zustand.store";
import { TableCell } from "@/shared/ui/ui-table";
import { Textarea } from "@/shared/ui/ui-textarea";
import { Cell } from "@prisma/client";
import { useState } from "react";

export const ChangeableTableCell = ({ cell }: { cell: Cell }) => {
  const [isChangeable, toggleIsChangeable] = useState(false);
  const [isChecked, toggleIsChecked] = useState(false);
  const { addChangedCell } = useChangedCellsStore();
  const { addCheckedCell } = useCheckedCellsStore();
  const {changedCells} = useChangedCellsStore()
  const value = changedCells.find((c) => c.id === cell.id)?.value || cell.value

  const toggleCheckedCell = () => {
    addCheckedCell(cell);
    toggleIsChecked(!isChecked);
  };

  return (
    <TableCell
      onDoubleClick={() => toggleIsChangeable(!isChangeable)}
      onClick={() => toggleCheckedCell()}
      className={`border-2 ${isChecked && !isChangeable ? "bg-rose-800" : ""}`}
    >
      {isChangeable ? (
        <Textarea
          onChange={(e) => addChangedCell({ ...cell, value: e.target.value })}
          placeholder={value}
          className="h-fit min-w-[100px]"
        />
      ) : (
        value.split("\n").map((value, index) => <p className="min-w-[100px]" key={index}>{value}</p>)
      )}
    </TableCell>
  );
};
