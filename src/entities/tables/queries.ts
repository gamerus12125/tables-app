import { Cell, Table } from "@prisma/client";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const tableKey = ["tables"];
export const useTablesQuery = () => {
  return useQuery({
    queryKey: tableKey,
    queryFn: () => axios.get<Table[]>("/api/tables").then((res) => res.data),
    placeholderData: keepPreviousData,
  });
};

export const useTableQuery = (id: number) => {
  return useQuery({
    queryKey: tableKey,
    queryFn: () =>
      axios.get<Table>(`/api/tables/${id}`).then((res) => res.data),
  });
};

export const useTableCellsQuery = (tableId: number) => {
  return useQuery({
    queryKey: [tableKey, "cells"],
    queryFn: () =>
      axios
        .get<Cell[]>(`/api/cells?tableId=${tableId}`)
        .then((res) => res.data),
  });
};

export const useAddTableCellMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tableKey, "add-cell"],
    mutationFn: ({
      tableId,
      col,
      row,
    }: {
      tableId: number;
      col: number;
      row: number;
    }) =>
      axios
        .post(`/api/cells`, { tableId, col, row, value: "" })
        .then((res) => res.data),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: tableKey });
    },
  });
};

export const useUpdateTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tableKey, "update-table"],
    mutationFn: ({
      tableId,
      name,
      rows,
      cols,
    }: {
      tableId: number;
      name?: string;
      rows?: number;
      cols?: number;
    }) =>
      axios
        .patch(`/api/tables/${tableId}`, { name, rows, cols })
        .then((res) => res.data),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: tableKey });
    },
  });
};

export const useAddTableCellsByAmountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tableKey, "add-by-amount"],
    mutationFn: ({
      tableId,
      col,
      row,
      amount,
    }: {
      tableId: number;
      col?: number;
      row?: number;
      amount: number;
    }) => {
      if (row || col) {
        return axios
          .post(`/api/cells`, { tableId, col, row, value: "", amount })
          .then((res) => res.data);
      } else {
        return Promise.reject("No row or col provided");
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: tableKey });
    },
  });
};

export const useUpdateTableCellsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tableKey, "update-cells"],
    mutationFn: ({
      cells,
    }: {
      cells: Cell[];
    }) =>
      axios
        .patch(`/api/cells`, { cells })
        .then((res) => res.data),
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: [tableKey] });
    },
  })
};

export const useDeleteTableCellsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [tableKey, "delete-cells"],
    mutationFn: ({
      tableId,
      col,
      row,
    }: {
      tableId: number;
      col?: number;
      row?: number;
    }) => {
      if (row || col) {
        return axios
          .delete(`/api/cells`, { data: { tableId, col, row } })
          .then((res) => res.data);
      } else {
        return Promise.reject("No row or col provided");
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: tableKey });
    },
  });
}