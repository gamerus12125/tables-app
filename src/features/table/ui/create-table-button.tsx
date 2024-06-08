"use client";
import { Button } from "@/shared/ui/ui-button";
import { useRouter } from "next/navigation";
import {
  useAddTableCellMutation,
  useCreateTableMutation,
} from "@/entities/tables";
import { useEffect } from "react";
export const CreateTableButton = () => {
  const createTableMutation = useCreateTableMutation();
  const addTableCellMutation = useAddTableCellMutation();
  const router = useRouter();

  useEffect(() => {
    if (createTableMutation.isSuccess) {
      addTableCellMutation.mutate({
        tableId: createTableMutation.data?.id,
        col: 0,
        row: 0,
      });
    }
  }, [createTableMutation.isSuccess]);

  useEffect(() => {
    if (addTableCellMutation.isSuccess) {
      router.push(`/tables/${createTableMutation.data?.id}`);
    }
  }, [addTableCellMutation.isSuccess]);

  return (
    <Button
      onClick={() =>
        createTableMutation.mutate({ name: "Новая таблица", rows: 1, cols: 1 })
      }
    >
      Создать таблицу
    </Button>
  );
};
