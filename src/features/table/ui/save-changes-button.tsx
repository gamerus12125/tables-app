"use client"
import { useUpdateTableCellsMutation } from "@/entities/tables"
import { useChangedCellsStore } from "@/shared/store/zustand.store"
import { Button } from "@/shared/ui/ui-button"

export const SaveChangesButton = () => {
    const {changedCells} = useChangedCellsStore()
    const updateTableCellsMutation = useUpdateTableCellsMutation()
    return <Button onClick={() => updateTableCellsMutation.mutate({cells: changedCells})}>Сохранить изменения</Button>
}