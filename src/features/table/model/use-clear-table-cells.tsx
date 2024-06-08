import { useUpdateTableCellsMutation } from "@/entities/tables";
import { useCheckedCellsStore } from "@/shared/store/zustand.store";

export const useClearTableCells = () => {
  const { checkedCells, removeCheckedCells } = useCheckedCellsStore();
  const updateTableCellsMutation = useUpdateTableCellsMutation();

  const clearCheckedCells = () => {
    updateTableCellsMutation.mutate({
      cells: checkedCells.map((cell) => ({ ...cell, value: "" , borderColor: null})),
    });
    removeCheckedCells();
  };

  return { clearCheckedCells, isPending: updateTableCellsMutation.isPending };
};
