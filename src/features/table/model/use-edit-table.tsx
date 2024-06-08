import { useUpdateTableMutation } from "@/entities/tables";

export const useEditTable = () => {
    const { mutate, isSuccess } = useUpdateTableMutation();
    const editTable = (title: string, tableId: number) => {
        mutate({ name: title, tableId });
    };
    return { editTable, isSuccess };
}