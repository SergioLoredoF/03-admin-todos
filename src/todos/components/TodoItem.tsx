'use client';
import { Todo } from "@prisma/client";
import todoItemStyle from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props {
    todo: Todo;
    toggleTodo: ( id: string ) => Promise<Todo|void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

    const [ todoOptimistic, toggleTodoOptimistic ] = useOptimistic( 
        todo,
        (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue }) 
    );

    const onToggleTodo = async() => {
        try {
            startTransition(() => toggleTodoOptimistic( !todoOptimistic.complete ));
            await toggleTodo( todoOptimistic.id );
        } catch {
            startTransition(() => toggleTodoOptimistic( !todoOptimistic.complete ));
        }
    }

    return(
        <div className={ todoOptimistic.complete ? todoItemStyle.todoDone : todoItemStyle.todoPending }>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                <div onClick={ onToggleTodo }
                    className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${ todoOptimistic.complete ? 'bg-blue-100': 'bg-red-100' }`}>
                    {
                        todoOptimistic.complete
                            ? <IoCheckboxOutline size={30} />
                            : <IoSquareOutline size={30} />
                    }
                </div>
                <div className="text-center sm:text-left">
                    { todoOptimistic.description }
                </div>
            </div>
        </div>
    );
}