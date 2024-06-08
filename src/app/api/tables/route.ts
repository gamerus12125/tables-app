import { auth } from "@/shared/auth/auth";
import client from "@/shared/auth/prisma";

export const GET = async () => {
    const tables = await client.table.findMany()
    return new Response(JSON.stringify(tables))
}

export const POST = async (req: Request) => {
    const session = await auth()
    if (!session?.user) {
        return new Response(null, { status: 401 });
    }
    const tableData = await req.json();
    if (!tableData) {
        return new Response(null, { status: 400 });
    }
    const newTable = await client.table.create({ data: { ownerId: session.user.id, ...tableData } });
    return new Response(JSON.stringify(newTable));
}
