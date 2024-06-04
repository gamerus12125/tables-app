"use client"
import { ClearTableCellsButton } from "@/features/clear-table-cells-button";
import { SaveChangesButton } from "@/features/save-changes-table-button";
import { TableWidget } from "@/widgets/table-widget";

const TablePage = ({ params }: { params: { id: number } }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-5 flex gap-5">
        <SaveChangesButton />
        <ClearTableCellsButton />
      </div>
      <TableWidget id={params.id} />
    </div>
  );
};

export default TablePage;
