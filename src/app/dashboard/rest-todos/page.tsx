export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Metadata } from "next";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { FormTodo, TodosGrid } from "@/todos";
import { getUserServerSession } from "@/auth-actions";

export const metadata: Metadata = {
    title: 'Listado de Todos',
    description: 'Listado de tareas'
}

export default async function RestTodosPage() {

    const user = await getUserServerSession();

    if( !user ) redirect('/api/auth/signin');

    const todos = await prisma.todo.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });

    return(
        <div>
            <div className="w-full px-3 mx-5 mb-5">
                {/* <NewTodo /> */}
                <FormTodo />
            </div>
            <TodosGrid todos={todos} />
        </div>
    );
}