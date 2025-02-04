'use server';
import { getUserServerSession } from "@/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async(): Promise<boolean> => {
    return new Promise((res) => {
        setTimeout( () =>{ res(true); }, 5000);
    });
}

export const toggleTodo = async( id: string ): Promise<Todo>  => {
    
    //await sleep();

    const todo = await prisma.todo.findFirst({ where: { id } });

    if( !todo ) throw `Todo con id: ${ id } no encontrado`;

    const updateTodo = await prisma.todo.update({
        where: { id },
        data: { complete: !todo.complete }
     })

     revalidatePath('/dashboard/server-actions');

     return updateTodo;
}

export const createTodo = async( description: string ) => {
    const user = await getUserServerSession();
    if(!user || !user.id)  throw 'Accion no permitida';
    const todo = await prisma.todo.create({ data: { description, userId: user?.id } });
    revalidatePath('/dashboard/server-actions');
    return todo;
}

export const deleteCompleted = async(): Promise<void> => {
    const user = await getUserServerSession();
    if(!user || !user.id)  throw 'Accion no permitida';
    await prisma.todo.deleteMany({ where: { complete: true, userId: user?.id } });
    revalidatePath('/dashboard/server-actions');
}