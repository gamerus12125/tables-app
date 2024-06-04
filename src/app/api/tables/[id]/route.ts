import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()

export const GET = async (req: Request, context: {params: {id: number}}) => {
    const id = Number(context.params.id)
    const table = await client.table.findUnique({where: {id}})
    if (table) {
        return new Response(JSON.stringify(table))
    }
    else {
        return new Response(null, {status: 404})
    }
}

export const PATCH = async (req: Request, context: {params: {id: number}}) => {
    const id = Number(context.params.id)
    const {name, rows, cols} = await req.json()
    if (!name || !rows || !cols || rows < 1 || cols < 1) {
        return new Response(null, {status: 400})
    }
    const table = await client.table.update({where: {id}, data: {name, rows, cols}})
    return new Response(JSON.stringify(table))
}