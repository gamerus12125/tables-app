import { Cell } from "@prisma/client";
import { create } from "zustand";

interface ChangedCellsState {
  changedCells: Cell[];
  addChangedCell: (cell: Cell) => void;
}

interface CheckedCellsState {
  checkedCells: Cell[];
  addCheckedCell: (cell: Cell) => void;
  removeCheckedCells: () => void;
}

export const useChangedCellsStore = create<ChangedCellsState>((set) => ({
  changedCells: [],
  addChangedCell: (cell) =>
    set(({ changedCells }) => {
      const newChangedCells = changedCells.find((c) => c.id === cell.id)
        ? changedCells.map((c) => (c.id === cell.id ? cell : c))
        : [...changedCells, cell];
      return { changedCells: newChangedCells };
    }),
}));


export const useCheckedCellsStore = create<CheckedCellsState>((set) => ({
  checkedCells: [],
  addCheckedCell: (cell) =>
    set(({ checkedCells }) => {
      if (checkedCells.find((c) => c.id === cell.id)) {
        const newCheckedCells = checkedCells.filter((item) => item.id !== cell.id);
        return { checkedCells: newCheckedCells };
      } else {
        const newCheckedCells = [...checkedCells, cell];
        return { checkedCells: newCheckedCells };
      }
    }),
    removeCheckedCells: () => set({ checkedCells: [] }),
}));
