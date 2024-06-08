"use client"
import { Button } from "@/shared/ui/ui-button";
import { useAddCells } from "../model/use-add-table-cells";
import { Table } from "@prisma/client";
import { Plus } from "lucide-react";

export const AddTableCellsButton = ({table, type}: {table: Table, type: "row" | "col"}) => {
    const {addCells} = useAddCells()
    return (
        <Button
        onClick={() =>
          addCells(type, table)
        }
      >
        <Plus />
      </Button>
    );
}