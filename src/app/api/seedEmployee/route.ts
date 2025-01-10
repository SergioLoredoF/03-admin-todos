import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    console.time('delete 1000000 de registros');
    await prisma.employee.deleteMany();
    console.timeEnd('delete 1000000 de registros');
    
    console.time('Crear un arreglo de un millon de registros');
    const employees = Array.from({ length: 50000 }, ( _, i ) => ({ name: 'juanitoteniaunpalitoxddd' + i, isAdmin: true  }))
    console.timeEnd('Crear un arreglo de un millon de registros');

    console.time('Guadar un millon de registros');

    for(let i = 0; i < 20; i++) {
        console.time(`Guardando etapa ${ (i +1 ) }/20 `);
        await prisma.employee.createMany({
            data: employees
        })
        console.timeEnd(`Guardando etapa ${ (i +1 ) }/20 `);
    }

    console.timeEnd('Guadar un millon de registros');

    return NextResponse.json({ message: 'Seed creada' })
}