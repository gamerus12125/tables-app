import { useUpdateTableCellsMutation } from "@/entities/tables";
import { useCheckedCellsStore } from "@/shared/store/zustand.store";

export const useChangeCellBorderColor = () => {
  const { checkedCells } = useCheckedCellsStore();
  const updateTableCellsMutation = useUpdateTableCellsMutation();
  const changeCellBorderColor = (color: string) => {
    updateTableCellsMutation.mutate({
      cells: checkedCells.map((cell) => ({ ...cell, borderColor: color })),
    });
  };
  return {
    changeCellBorderColor,
    isPending: updateTableCellsMutation.isPending,
  };
};
