'use client';
//import { useRouter } from 'next/navigation';
import { Todo } from '@prisma/client';
import { TodoItem } from './TodoItem';

//Formas de comunicación con el server
//import * as apiTodo from '@/todos/helpers/todos';
import { toggleTodo } from '../actions/todo-actions';

interface Props {
    todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {

    //const router = useRouter();

    //Forma clasica
    // const toggleTodo = async( id: string, complete: boolean ) => {
    //     const updateTodo = await apiTodo.actualizaTodos( id, complete );
    //     router.refresh();
    // }

    return(
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2' style={{ gap: '1rem' }}>
            {
                todos.map( todo => <TodoItem key={ todo.id } todo={ todo } toggleTodo={ toggleTodo } />)
            }
        </div>
    );
}