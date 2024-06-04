import { useTablesQuery } from "@/entities/tables"

export const useTables = () => {
    const {data, isPending} = useTablesQuery()
    const tables = Array.isArray(data) ? data : []
    return {tables, isPending}
}