import { Todo } from "@prisma/client";

export const actualizaTodos = async( id: string, status: boolean ): Promise<Todo> => {
    try {
        const res = await fetch('/api/todos/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                complete: !status
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if( !res.ok ) throw('Bad request');

        const resJson = await res.json();

        return resJson;

    } catch {
        throw('No fue posible actualizar la tarea');
    }
}

export const createTodo = async( description: string ): Promise<Todo> => {
    try {
        const res = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify({
                description
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if( !res.ok ) throw('Bad request');

        const resJson = await res.json();

        return resJson;

    } catch {
        throw('No fue posible actualizar la tarea');
    }
}

export const deleteCompletedTodos = async(): Promise<Todo> => {
    try {
        const res = await fetch('/api/todos', { method: 'DELETE' });

        if( !res.ok ) throw('Bad request');

        const resJson = await res.json();

        return resJson;

    } catch {
        throw('No fue posible actualizar la tarea');
    }
}