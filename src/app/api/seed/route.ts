import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function GET() {
    //const arrayMil = Array.from({ length: 10 }, ( _, i ) => ({ description: 'Ardilla' + i }) )

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            email: 'test1@gmail.com',
            password: bcrypt.hashSync('cisco'),
            roles: ['admin', 'user', 'super-user'],
            name: 'Test1',
            todos: {
                create: [
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
                ]
            }
        }
    });

    return NextResponse.json({
        message: 'Seed Executed'
    });
}