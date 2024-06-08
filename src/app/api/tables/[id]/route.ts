import { auth } from "@/shared/auth/auth";
import client from "@/shared/auth/prisma";

export const GET = async (
  req: Request,
  context: { params: { id: number } } | undefined
) => {
  if (!context?.params.id) {
    return new Response(null, { status: 400 });
  }
  const id = Number(context.params.id);
  const table = await client.table.findUnique({ where: { id } });
  if (!table) {
    return new Response(null, { status: 404 });
  }
  return new Response(JSON.stringify(table));
};

export const PATCH = async (
  req: Request,
  context: { params: { id: number } }
) => {
  const id = Number(context.params.id);
  const session = await auth();
  if (!session?.user) {
    return new Response(null, { status: 400 });
  }

  const { name, rows, cols } = await req.json();
  if (!name && (!rows || !cols || rows < 1 || cols < 1)) {
    return new Response(null, { status: 400 });
  }

  const ownerId = await client.table.findFirst({
    where: { id },
    select: { ownerId: true },
  });
  
  if (session.user.id !== ownerId?.ownerId && session?.user?.role !== "admin") {
    return new Response(null, { status: 403 });
  }

  const table = await client.table
    .update({
      where: { id },
      data: { name, rows, cols },
    })
    .catch((err) => {
      console.error(err);
      return new Response(null, { status: 500 });
    });
    
  if (!table) {
    return new Response(null, { status: 404 });
  }
  return new Response(JSON.stringify(table));
};
