"use client";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { Table } from "@prisma/client";
import { useTables } from "../model/use-tables";
import Link from "next/link";
export const TablesList = () => {
  const { tables, isPending } = useTables();
  const isEmpty = !isPending && tables.length === 0;

  return (
    <>
      {isPending && <UiSpinner className="w-10 h-10" />}
      {!isEmpty ? (
        <ul className="grid p-5">
          {tables.map((table: Table) => (
            <li key={table.id} className="text-xl border-[4px] w-fit h-fit p-5">
              <Link href={`/tables/${table.id}`}>{table.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Нет таблиц</p>
      )}
    </>
  );
};
