import { NextRequest } from "next/server";
import { client } from "../client";
import { Cell } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  const tableId = Number(req.nextUrl.searchParams.get("tableId"));
  const cells = await client.cell.findMany({ where: { tableId } });
  return new Response(JSON.stringify(cells));
};

export const POST = async (req: NextRequest) => {
  const { tableId, col, row, value, amount } = await req.json();
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
