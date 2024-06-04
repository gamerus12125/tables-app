import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()
export const GET = async () => {
    const tables = await client.table.findMany()
    return new Response(JSON.stringify(tables))
}