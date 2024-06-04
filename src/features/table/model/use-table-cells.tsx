import { useTableCellsQuery } from "@/entities/tables"

export const useTableCells = (tableId: number) => {
    const { data, isPending } = useTableCellsQuery(tableId)
    const cells = data || []
    return { cells, isPending }
}