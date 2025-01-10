export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { FormTodo, TodosGrid } from "@/todos";

export const metadata: Metadata = {
    title: 'Listado de Todos',
    description: 'Listado de tareas'
}

export default async function ServerActionsPage() {

    const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
    return(
        <>
            <span className="text-3xl mb-10 " >Server actions</span>
            <div className="w-full px-3 mx-5 mb-5">
                {/* <NewTodo /> */}
                <FormTodo />
            </div>
            <TodosGrid todos={todos} />
        </>
    );
}