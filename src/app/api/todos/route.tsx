import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from 'yup';


export async function GET( request: NextRequest) {
    const { searchParams } = new URL( request.url );
    const offset = +( searchParams.get('offset') ?? '0' ); //El signo + es lo mismo que poner Number()
    const limit  = Number( searchParams.get('limit') ?? '5' );

    //Validamos parametros
    if( isNaN( offset ) ) return NextResponse.json({ message: 'El parametro ( offset ) no es un número' }, { status: 400 });
    if( isNaN( limit ) ) return NextResponse.json({ message: 'El parametro ( limit ) no es un número' }, { status: 400 });

    const todos = await prisma.todo.findMany({
        skip: offset,
        take: limit
    });

    return NextResponse.json(todos);
};

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});

export async function POST( request: NextRequest ) {
    try {
        const { complete, description } = await postSchema.validate( await request.json() );
        const body = { complete, description };

        const res = await prisma.todo.create({ data: body });
    
        return NextResponse.json( res ); 

    } catch (error) {
        return NextResponse.json( error, { status: 400 } )
    }
}

export async function DELETE() {
    try {
        const res = await prisma.todo.deleteMany({ where: { complete: true } })

        return NextResponse.json(res);
    } catch {
        return NextResponse.json({ message: 'Error al borrar Todos' }, { status: 500 })
    }
}