import { useTableQuery } from "@/entities/tables"

export const useTable = (id: number) => {
    const { data, isPending } = useTableQuery(id)
    const table = data || undefined
    return { table, isPending }
}