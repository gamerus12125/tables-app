import { NextRequest } from "next/server";
import client from "@/shared/auth/prisma";
import { Cell } from "@prisma/client";
import { auth } from "@/shared/auth/auth";

export const GET = async (req: NextRequest) => {
  const tableId = Number(req.nextUrl.searchParams.get("tableId"));
  const cells = await client.cell.findMany({ where: { tableId } });
  return new Response(JSON.stringify(cells));
};

export const POST = async (req: NextRequest) => {
  const { tableId, col, row, value, amount } = await req.json();
  const session = await auth();
  const ownerId = await client.table.findFirst({
    where: { id: Number(tableId) },
    select: { ownerId: true },
  });


  if (ownerId?.ownerId !== session?.user?.id && session?.user?.role !== "admin") {
    return new Response(null, { status: 403 });
  }

  if (amount) {
    if (col) {
      // Add column
      for (let i = 0; i < amount; i++) {
        await client.cell.create({
          data: {
            tableId: Number(tableId),
            col: Number(col),
            row: i,
            value,
          },
        });
      }
    } else if (row) {
      // Add row
      for (let i = 0; i < amount; i++) {
        await client.cell.create({
          data: {
            tableId: Number(tableId),
            col: i,
            row: Number(row),
            value,
          },
        });
      }
    }
    return new Response(JSON.stringify({}));
  } else {
    // Add cell
    const cell = await client.cell.create({
      data: {
        tableId: Number(tableId),
        col: Number(col),
        row: Number(row),
        value,
      },
    });
    return new Response(JSON.stringify(cell));
  }
};

export const PATCH = async (req: NextRequest) => {
  const { cells, cell }: { cells?: Cell[]; cell?: Cell } = await req.json();
  const session = await auth();
  let ownerId = {} as any
  if (cells) {
    ownerId = await client.table.findFirst({
      where: { id: cells[0]?.tableId },
      select: { ownerId: true },
    })
  } else if (cell) {
    ownerId = await client.table.findFirst({
      where: { id: cell?.tableId },
      select: { ownerId: true },
    })
  } else {
    return new Response(null, { status: 400 });
  }

  if (ownerId?.ownerId !== session?.user?.id && session?.user?.role !== "admin") {
    return new Response(null, { status: 403 });
  }

  if (cells) {
    cells.forEach(async (cell) => {
      await client.cell.update({
        where: { id: cell.id },
        data: { ...cell },
      });
    });
    return new Response(JSON.stringify(cells));
  } else if (cell) {
    const res = await client.cell.update({
      where: { id: cell.id },
      data: { ...cell },
    });
    return new Response(JSON.stringify(res));
  } else {
    return new Response(null, { status: 400 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { id, row, col }: { id: number; row?: number; col?: number } =
    await req.json();

  const session = await auth();

  const ownerId = await client.table.findFirst({
    where: { id },
    select: { ownerId: true },
  });

  if (ownerId?.ownerId !== session?.user?.id && session?.user?.role !== "admin") {
    return new Response(null, { status: 403 });
  }

  if (row) {
    const res = await client.cell.deleteMany({
      where: {
        tableId: id,
        row,
      },
    });
    return new Response(JSON.stringify(res));
  } else if (col) {
    const res = await client.cell.deleteMany({
      where: {
        tableId: id,
        col,
      },
    });
    return new Response(JSON.stringify(res));
  } else {
    const res = await client.cell.delete({ where: { id } });
    return new Response(JSON.stringify(res));
  }
};
