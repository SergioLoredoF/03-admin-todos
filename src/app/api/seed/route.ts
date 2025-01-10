import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    await prisma.todo.deleteMany();

    const arrayMil = Array.from({ length: 10 }, ( _, i ) => ({ description: 'Ardilla' + i }) )

    await prisma.todo.createMany({
        data: [
           { description: 'Ardilla' }, 
           { description: 'Zapato' }, 
           { description: 'Nave espacial' }, 
           { description: 'Alegato' }, 
           { description: 'Dios' }, 
           { description: 'Huya' }, 
           { description: 'Epifania' }, 
           { description: 'Rayo' }, 
           { description: 'Característica' }, 
           { description: 'Duende de las rocas' }, 
           { description: 'Apapacho', complete: true }, 
           ...arrayMil
        ]
    });

    return NextResponse.json({
        message: 'Seed Executed'
    });
}