import { getUserServerSession } from "@/auth-actions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from 'yup';

interface ISegments {
    params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, segments: ISegments) {
    const user = await getUserServerSession();
    if (!user || !user.id) {
        return NextResponse.json({ mess: 'No autorizado' }, { status: 401 });
    }

    const { id } = await segments.params;

    const res = await prisma.todo.findFirst({ where: { id: id, userId: user.id } });

    if (!res) return NextResponse.json({ message: `La tarea id: ${id} no existe` }, { status: 404 });

    return NextResponse.json(res);
}

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional()
});

export async function PUT(request: NextRequest, segments: ISegments) {
    try {

        const user = await getUserServerSession();
        if (!user || !user.id) {
            return NextResponse.json({ mess: 'No autorizado' }, { status: 401 });
        }

        //Comprobamos que exista el registro
        const { id } = await segments.params;

        const res = await prisma.todo.findFirst({ where: { id: id, userId: user.id } });

        if (!res) return NextResponse.json({ message: `La tarea id: ${id} no existe` }, { status: 404 });

        //Validamos y actualizamos registro
        const { complete, description } = await putSchema.validate(await request.json());
        const body = { complete, description };

        const updateTodo = await prisma.todo.update({ where: { id, userId: user.id }, data: body })

        return NextResponse.json(updateTodo);
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}