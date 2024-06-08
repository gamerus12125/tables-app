import { ChangeCellBorderColorButton, ClearTableCellsButton, EditTableButton, SaveChangesButton } from "@/features/table";
import { TableWidget } from "@/widgets/table-widget";

const TablePage = ({ params }: { params: { id: number } }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-5 flex gap-5">
        <SaveChangesButton />
        <ClearTableCellsButton />
        <ChangeCellBorderColorButton />
        <EditTableButton tableId={params.id}/>
      </div>
      <TableWidget id={params.id} />
    </div>
  );
};

export default TablePage;
